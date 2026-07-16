const ChatMessage = require("../models/ChatMessage");
const { generateAIResponse } = require("./aiController");
const Workspace = require("../models/Workspace");

const getMessages = async (req, res) => {
  try {
    const { workspaceId, projectId, recipient } = req.query;
    if (!workspaceId || !recipient) {
      return res.status(400).json({ message: "Workspace ID and Recipient are required" });
    }

    const filter = {
      workspace: workspaceId,
      owner: req.user._id,
      recipient,
    };

    if (projectId) {
      filter.project = projectId;
    }

    const messages = await ChatMessage.find(filter).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { workspaceId, projectId, recipient, text } = req.body;
    if (!workspaceId || !recipient || !text) {
      return res.status(400).json({ message: "Workspace ID, Recipient, and Message text are required" });
    }

    // 1. Create and save user's message
    const userMessage = await ChatMessage.create({
      workspace: workspaceId,
      project: projectId || null,
      owner: req.user._id,
      sender: "You",
      senderName: req.user.username,
      text,
      recipient,
    });

    // 2. Helper to handle document parsing from response text
    const parseAndSaveDocument = async (responseText, wsId, projId, ownerId) => {
      const createDocRegex = /\[CREATE_DOCUMENT\]\s*Type:\s*([a-zA-Z0-9]+)\s*Title:\s*([^\n\r]+)\s*Content:\s*([\s\S]*?)\[END_CREATE_DOCUMENT\]/i;
      const match = responseText.match(createDocRegex);

      if (match) {
        const type = match[1].trim().toLowerCase();
        const title = match[2].trim();
        const content = match[3].trim();

        // Strip the block from the response text so the chat bubble is clean
        const cleanedText = responseText.replace(createDocRegex, "").trim();

        try {
          const Document = require("../models/Document");
          const newDoc = await Document.create({
            title,
            content,
            type,
            workspace: wsId,
            project: projId || null,
            owner: ownerId,
          });

          return {
            text: `${cleanedText}\n\n*(System Matrix Alert: I have successfully compiled the requested asset and saved it to the Secure Memory Vault: "${title}")*`,
            docCreated: true
          };
        } catch (docErr) {
          console.error("Document auto-creation failed:", docErr);
        }
      }
      return { text: responseText, docCreated: false };
    };

    // 3. Determine bot recipient(s) to respond
    let botResponse = null;

    if (recipient === "team") {
      // Team Chat: Optimus Prime coordinates
      let responseText = await generateAIResponse(
        req.user._id,
        workspaceId,
        projectId,
        "prime",
        `[TEAM COORDINATION] The Commander asks the leadership team: "${text}"`
      );

      const parsedPrime = await parseAndSaveDocument(responseText, workspaceId, projectId, req.user._id);

      const primeResponse = await ChatMessage.create({
        workspace: workspaceId,
        project: projectId || null,
        owner: req.user._id,
        sender: "prime",
        senderName: "Optimus Prime",
        text: parsedPrime.text,
        recipient: "team",
      });

      // Specialist follow-up routing based on keywords
      const workspaceObj = await Workspace.findById(workspaceId);
      const employees = workspaceObj?.employees || [];
      const lowerText = text.toLowerCase();
      let matchedBotId = null;

      if (lowerText.includes("code") || lowerText.includes("react") || lowerText.includes("bug") || lowerText.includes("engineering") || lowerText.includes("database") || lowerText.includes("develop")) {
        matchedBotId = "wheeljack";
      } else if (lowerText.includes("hr") || lowerText.includes("hiring") || lowerText.includes("personnel") || lowerText.includes("hire") || lowerText.includes("onboard")) {
        matchedBotId = "bumblebee";
      } else if (lowerText.includes("security") || lowerText.includes("safe") || lowerText.includes("protect") || lowerText.includes("leak") || lowerText.includes("threat") || lowerText.includes("encrypt")) {
        matchedBotId = "ironhide";
      }

      const activeEmp = employees.find(e => e.id === matchedBotId);
      
      if (activeEmp && matchedBotId !== "prime") {
        let followupResponseText = await generateAIResponse(
          req.user._id,
          workspaceId,
          projectId,
          matchedBotId,
          `[TEAM FOLLOWUP] Optimus Prime coordinated: "${parsedPrime.text}". As the specialist, provide your specialized follow-up directive for the Commander's query: "${text}"`
        );

        const parsedFollowup = await parseAndSaveDocument(followupResponseText, workspaceId, projectId, req.user._id);

        const specialistResponse = await ChatMessage.create({
          workspace: workspaceId,
          project: projectId || null,
          owner: req.user._id,
          sender: matchedBotId,
          senderName: activeEmp.name,
          text: parsedFollowup.text,
          recipient: "team",
        });

        botResponse = [primeResponse, specialistResponse];
      } else {
        botResponse = primeResponse;
      }
    } else {
      // Individual Bot Chat
      const workspaceObj = await Workspace.findById(workspaceId);
      const emp = workspaceObj?.employees.find(e => e.id === recipient);
      const botName = emp ? emp.name : recipient.toUpperCase();

      let responseText = await generateAIResponse(
        req.user._id,
        workspaceId,
        projectId,
        recipient,
        text
      );

      const parsedBot = await parseAndSaveDocument(responseText, workspaceId, projectId, req.user._id);

      botResponse = await ChatMessage.create({
        workspace: workspaceId,
        project: projectId || null,
        owner: req.user._id,
        sender: recipient,
        senderName: botName,
        text: parsedBot.text,
        recipient,
      });
    }

    // Return both the saved user message and bot's response(s)
    res.status(201).json({
      userMessage,
      botResponse,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
