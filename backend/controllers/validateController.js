// validateController.js — Live API key validation against each LLM provider
const Setting = require("../models/Setting");

/**
 * POST /api/validate
 * Body: { provider, apiKey, model }
 * Returns: { valid: boolean, message: string, models?: [] }
 */
const validateKey = async (req, res) => {
  const { provider, apiKey, model } = req.body;

  if (!provider || !apiKey) {
    return res.status(400).json({ valid: false, message: "Provider and API key are required." });
  }

  const testPrompt = "Reply with one word: OK";

  try {
    let isValid = false;
    let message = "";

    // ─── GEMINI ───────────────────────────────────────────────────────────────
    if (provider === "gemini") {
      const testModel = model || "gemini-2.0-flash";
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${testModel}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: testPrompt }] }] }),
          signal: AbortSignal.timeout(10000),
        }
      );
      const d = await r.json();
      if (d.candidates?.[0]?.content?.parts?.[0]?.text) {
        isValid = true;
        message = `✓ Gemini key valid — model ${testModel} responding.`;
      } else if (d.error) {
        message = `✗ ${d.error.message || "Invalid Gemini API key."}`;
      } else {
        message = "✗ Unexpected response from Gemini API.";
      }
    }

    // ─── OPENAI ───────────────────────────────────────────────────────────────
    else if (provider === "openai") {
      const testModel = model || "gpt-4.1-nano";
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 5,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content) {
        isValid = true;
        message = `✓ OpenAI key valid — model ${testModel} responding.`;
      } else if (d.error) {
        message = `✗ ${d.error.message || "Invalid OpenAI API key."}`;
      } else {
        message = "✗ Unexpected response from OpenAI API.";
      }
    }

    // ─── CLAUDE (ANTHROPIC) ───────────────────────────────────────────────────
    else if (provider === "claude") {
      const testModel = model || "claude-opus-4-5";
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: testModel,
          max_tokens: 5,
          messages: [{ role: "user", content: testPrompt }],
        }),
        signal: AbortSignal.timeout(10000),
      });
      const d = await r.json();
      if (d.content?.[0]?.text) {
        isValid = true;
        message = `✓ Claude key valid — model ${testModel} responding.`;
      } else if (d.error) {
        message = `✗ ${d.error.message || "Invalid Claude API key."}`;
      } else {
        message = "✗ Unexpected response from Anthropic API.";
      }
    }

    // ─── DEEPSEEK ─────────────────────────────────────────────────────────────
    else if (provider === "deepseek") {
      const testModel = model || "deepseek-chat";
      const r = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 5,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content) {
        isValid = true;
        message = `✓ DeepSeek key valid — model ${testModel} responding.`;
      } else if (d.error) {
        message = `✗ ${d.error.message || "Invalid DeepSeek API key."}`;
      } else {
        message = "✗ Unexpected response from DeepSeek API.";
      }
    }

    // ─── GROQ ─────────────────────────────────────────────────────────────────
    else if (provider === "groq") {
      const testModel = model || "llama-3.3-70b-versatile";
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 5,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content) {
        isValid = true;
        message = `✓ Groq key valid — model ${testModel} responding.`;
      } else if (d.error) {
        message = `✗ ${d.error.message || "Invalid Groq API key."}`;
      } else {
        message = "✗ Unexpected response from Groq API.";
      }
    }

    // ─── TOGETHER AI ──────────────────────────────────────────────────────────
    else if (provider === "together") {
      const testModel = model || "meta-llama/Llama-4-Scout-17B-16E-Instruct";
      const r = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 5,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content) {
        isValid = true;
        message = `✓ Together AI key valid — model ${testModel} responding.`;
      } else if (d.error) {
        message = `✗ ${d.error?.message || "Invalid Together AI API key."}`;
      } else {
        message = "✗ Unexpected response from Together AI API.";
      }
    }

    // ─── MISTRAL ──────────────────────────────────────────────────────────────
    else if (provider === "mistral") {
      const testModel = model || "mistral-large-latest";
      const r = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 5,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content) {
        isValid = true;
        message = `✓ Mistral key valid — model ${testModel} responding.`;
      } else if (d.error || d.message) {
        message = `✗ ${d.message || "Invalid Mistral API key."}`;
      } else {
        message = "✗ Unexpected response from Mistral API.";
      }
    }

    // ─── OPENROUTER ───────────────────────────────────────────────────────────
    else if (provider === "openrouter") {
      const testModel = model || "meta-llama/llama-4-scout:free";
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://neuroloom.ai",
          "X-Title": "NeuroLoom AI OS",
        },
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 5,
        }),
        signal: AbortSignal.timeout(12000),
      });
      const d = await r.json();
      if (d.choices?.[0]?.message?.content) {
        isValid = true;
        message = `✓ OpenRouter key valid — model ${testModel} responding.`;
      } else if (d.error) {
        message = `✗ ${d.error?.message || "Invalid OpenRouter API key."}`;
      } else {
        message = "✗ Unexpected response from OpenRouter API.";
      }
    }

    // ─── OLLAMA (LOCAL) ───────────────────────────────────────────────────────
    else if (provider === "ollama") {
      const endpoint = apiKey || "http://localhost:11434";
      try {
        const r = await fetch(`${endpoint}/api/tags`, {
          signal: AbortSignal.timeout(5000),
        });
        const d = await r.json();
        if (d.models) {
          isValid = true;
          message = `✓ Ollama running at ${endpoint} — ${d.models.length} models available.`;
        } else {
          message = `✗ Ollama server at ${endpoint} responded unexpectedly.`;
        }
      } catch {
        message = `✗ Could not reach Ollama at ${endpoint}. Is it running?`;
      }
    }

    // ─── LM STUDIO (LOCAL) ────────────────────────────────────────────────────
    else if (provider === "lmstudio") {
      try {
        const r = await fetch("http://localhost:1234/v1/models", {
          signal: AbortSignal.timeout(5000),
        });
        const d = await r.json();
        if (d.data) {
          isValid = true;
          message = `✓ LM Studio running — ${d.data.length} model(s) loaded.`;
        } else {
          message = "✗ LM Studio responded unexpectedly.";
        }
      } catch {
        message = "✗ Could not reach LM Studio at localhost:1234.";
      }
    }

    // ─── AZURE OPENAI ─────────────────────────────────────────────────────────
    else if (provider === "azure") {
      // Azure requires resource name — we use the model field for deployment name
      message = "ℹ Azure OpenAI keys can only be validated within your Azure portal.";
      isValid = true; // Optimistic — we can't validate without resource name
    }

    else {
      message = `✗ Unknown provider: ${provider}`;
    }

    return res.json({ valid: isValid, message });

  } catch (err) {
    const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
    return res.json({
      valid: false,
      message: isTimeout
        ? `✗ Request timed out — ${provider} API did not respond in time.`
        : `✗ Validation error: ${err.message}`,
    });
  }
};

module.exports = { validateKey };
