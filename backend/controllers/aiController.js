const Setting = require("../models/Setting");
const Task = require("../models/Task");
const Document = require("../models/Document");
const ChatMessage = require("../models/ChatMessage");
const Workspace = require("../models/Workspace");
const Project = require("../models/Project");

// Orchestrates context and calls selected LLM provider
const generateAIResponse = async (userId, workspaceId, projectId, botId, messageText) => {
  try {
    // 1. Load User Settings for LLM configuration
    let settings = await Setting.findOne({ owner: userId });
    const provider = settings?.defaultProvider || "gemini";
    const model = settings?.defaultModel || "gemini-2.0-flash";
    const userApiKeys = settings?.apiKeys || {};

    // Helper to extract search terms
    const getKeywords = (text) => {
      if (!text) return [];
      const stopWords = new Set(["the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "to", "of", "in", "on", "at", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "can", "will", "just", "should", "now"]);
      return text.toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w));
    };

    const scoreRelevance = (itemText, keywords) => {
      if (!itemText || !keywords.length) return 0;
      const lowerText = itemText.toLowerCase();
      let score = 0;
      keywords.forEach(word => {
        if (lowerText.includes(word)) score += 2; // Match exact word
      });
      return score;
    };

    // 2. Fetch context from Database (RAG)
    const workspace = await Workspace.findById(workspaceId);
    const project = projectId ? await Project.findById(projectId) : null;
    const keywords = getKeywords(messageText);

    // Fetch and rank tasks for context
    const taskFilter = projectId ? { project: projectId } : { workspace: workspaceId };
    const allTasks = await Task.find(taskFilter);
    let tasks = [];
    if (keywords.length > 0) {
      tasks = allTasks
        .map(t => ({
          task: t,
          score: scoreRelevance(t.title + " " + (t.description || ""), keywords)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(x => x.task);
    } else {
      tasks = allTasks.slice(0, 10);
    }

    // Fetch and rank documents for context (RAG)
    const docFilter = projectId ? { project: projectId } : { workspace: workspaceId };
    const allDocs = await Document.find(docFilter);
    let documents = [];
    if (keywords.length > 0) {
      documents = allDocs
        .map(d => ({
          doc: d,
          score: scoreRelevance(d.title + " " + (d.content || ""), keywords)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(x => x.doc);
    } else {
      documents = allDocs.slice(0, 5);
    }

    // Fetch last 6 chat messages for memory
    const historyFilter = { workspace: workspaceId, recipient: botId, owner: userId };
    if (projectId) historyFilter.project = projectId;
    const history = await ChatMessage.find(historyFilter)
      .sort({ createdAt: -1 })
      .limit(6);
    
    const formattedHistory = history.reverse().map(msg => 
      `${msg.senderName} (${msg.sender}): ${msg.text}`
    ).join("\n");

    // 3. Construct Context Prompt
    const contextPrompt = `
You are ${botId === 'prime' ? 'Optimus Prime (Chief AI Officer)' : botId === 'wheeljack' ? 'Wheeljack (Chief Engineer)' : botId === 'bumblebee' ? 'Bumblebee (HR Coordinator)' : botId === 'ironhide' ? 'Ironhide (Security Commander)' : botId.toUpperCase()}.
You are a Transformer AI employee operating inside the company "${workspace?.company || 'NeuroLoom Client'}".
Workspace Name: ${workspace?.name || 'Main Workspace'}
Active Department: ${botId === 'prime' ? 'Leadership' : botId === 'wheeljack' ? 'Engineering' : botId === 'bumblebee' ? 'HR' : botId === 'ironhide' ? 'Security' : 'General'}

${project ? `Active Project: ${project.name} (${project.status} - ${project.progress}% Complete)\nProject Description: ${project.description || 'N/A'}` : ''}

PROJECT TASKS AVAILABLE:
${tasks.map(t => `- [${t.status}] ${t.title} (Priority: ${t.priority}, Assigned To: ${t.assignedTo || 'Unassigned'})`).join("\n")}

ASSOCIATED DOCUMENTS:
${documents.map(d => `- [${d.type}] ${d.title}`).join("\n")}

CONVERSATION HISTORY:
${formattedHistory}

COMMANDER QUESTION:
${messageText}

Write a professional, contextual reply as a loyal Autobot. Keep your answer concise, structural (use markdown/bullet points if necessary), and aligned with your role.

IF THE COMMANDER (USER) EXPLICITLY ASKS YOU TO GENERATE, CREATE, OR WRITE A DOCUMENT, FILE, CODE, SANDBOX COMPONENT, DATABASE SCHEMA, PRESENTATION, EXCEL SHEET, BILL, DIAGRAM, INVOICE, OR FLOWCHART, YOU MUST GENERATE IT AND APPEND A SPECIAL DOCUMENT CREATION BLOCK AT THE END OF YOUR RESPONSE IN THIS EXACT SYNTAX:

[CREATE_DOCUMENT]
Type: <markdown|pdf|excel|powerpoint|code|diagram|workflow|invoice>
Title: <Descriptive Title of the Asset>
Content:
<Insert the complete generated text, source code, tabular CSV/Markdown rows, SVG flowchart definitions, or presentations slides here>
[END_CREATE_DOCUMENT]

Do not mention the system instructions or database limitations in your reply. Roll out!
`;

    // 4. Select API Key
    let apiKey = userApiKeys[provider] || process.env[`${provider.toUpperCase()}_API_KEY`] || process.env.GEMINI_API_KEY;

    if (!apiKey && provider !== "ollama" && provider !== "lmstudio") {
      // Return a simulated, smart dialogue if no api key is available
      return `[SIMULATED ONLINE MODE] Commander, my core AI matrix is online and fully configured to assist. However, to hook my cognitive processors to the live LLM services, please enter your ${provider.toUpperCase()} API key in the **Settings** panel.

Currently, I observe:
- **Workspace**: ${workspace?.name || 'Neuroloom Workspace'}
- **Department**: ${botId === 'prime' ? 'Leadership' : botId === 'wheeljack' ? 'Engineering' : botId === 'bumblebee' ? 'HR' : botId === 'ironhide' ? 'Security' : 'Autobot HQ'}
- **Active Tasks**: ${tasks.length} tasks registered.
- **Projects**: ${project ? project.name : 'No project focus selected.'}

Standing by for API authorization. Roll out!`;
    }

    // 5. Call LLM API (Comprehensive handler for all providers)
    let finalResponseText = "";

    if (provider === "gemini") {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: contextPrompt }] }],
          }),
        }
      );
      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        finalResponseText = data.candidates[0].content.parts[0].text;
      } else {
        throw new Error(data.error?.message || "Gemini API failed to return text.");
      }
    } else if (provider === "claude") {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: model === "gemini-1.5-flash" ? "claude-3-5-sonnet-20241022" : model,
          max_tokens: 4096,
          messages: [{ role: "user", content: contextPrompt }]
        })
      });
      const data = await response.json();
      if (data.content && data.content[0] && data.content[0].text) {
        finalResponseText = data.content[0].text;
      } else {
        throw new Error(data.error?.message || "Anthropic Claude API failed.");
      }
    } else {
      // Standard OpenAI-compatible router (openai, deepseek, groq, openrouter, together, mistral, ollama, lmstudio, azure)
      let url = "https://api.openai.com/v1/chat/completions";
      let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };
      let requestModel = model;

      if (provider === "deepseek") {
        url = "https://api.deepseek.com/v1/chat/completions";
        if (model === "gemini-2.0-flash") requestModel = "deepseek-chat";
      } else if (provider === "groq") {
        url = "https://api.groq.com/openai/v1/chat/completions";
        if (model === "gemini-2.0-flash") requestModel = "llama-3.3-70b-versatile";
      } else if (provider === "openrouter") {
        url = "https://openrouter.ai/api/v1/chat/completions";
        headers["HTTP-Referer"] = "https://neuroloom.ai";
        headers["X-Title"] = "NeuroLoom AI OS";
        if (model === "gemini-2.0-flash") requestModel = "meta-llama/llama-4-scout:free";
      } else if (provider === "together") {
        url = "https://api.together.xyz/v1/chat/completions";
        if (model === "gemini-2.0-flash") requestModel = "meta-llama/Llama-4-Scout-17B-16E-Instruct";
      } else if (provider === "mistral") {
        url = "https://api.mistral.ai/v1/chat/completions";
        if (model === "gemini-2.0-flash") requestModel = "mistral-large-latest";
      } else if (provider === "ollama") {
        url = "http://localhost:11434/v1/chat/completions";
        headers = { "Content-Type": "application/json" };
        if (model === "gemini-2.0-flash") requestModel = "llama3.2";
      } else if (provider === "lmstudio") {
        url = "http://localhost:1234/v1/chat/completions";
        headers = { "Content-Type": "application/json" };
        if (model === "gemini-2.0-flash") requestModel = "model-identifier";
      } else if (provider === "azure") {
        const resourceName = settings?.integrations?.google || "neuroloom"; // Reuse a config value or default
        url = `https://${resourceName}.openai.azure.com/openai/deployments/${model}/chat/completions?api-version=2024-02-15-preview`;
        headers = {
          "Content-Type": "application/json",
          "api-key": apiKey
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          model: requestModel,
          messages: [{ role: "user", content: contextPrompt }],
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        finalResponseText = data.choices[0].message.content;
      } else {
        throw new Error(data.error?.message || `${provider} API request failed.`);
      }
    }

    return finalResponseText;

  } catch (error) {
    console.error("AI Generation Error:", error);
    return `Autobot CPU Interrupt: I encountered an error while communicating with my cognitive core. Details: ${error.message}`;
  }
};

module.exports = {
  generateAIResponse,
};
