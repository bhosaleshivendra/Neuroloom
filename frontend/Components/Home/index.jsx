import { useState } from "react";

import AISelector from "./AISelector";
import ChatBox from "./ChatBox";
import WorkspaceCarousel from "./WorkspaceCarousel";

import prime from "../../src/assets/autobots/prime.png";
import bumblebee from "../../src/assets/autobots/bumblebee.png";
import jazz from "../../src/assets/autobots/jazz.png";
import ironhide from "../../src/assets/autobots/ironhide.png";
import ratchet from "../../src/assets/autobots/ratchet.png";
import { autobotImages } from "../../src/data/autobots";

const autobots = [
  {
    id: "prime",
    name: "Optimus Prime",
    role: "Chief AI Officer",
    image: prime,
    status: "ONLINE",
    greeting: "Greetings Commander. I am ready to assist you.",
  },
  {
    id: "bumblebee",
    name: "Bumblebee",
    role: "HR Representative",
    image: bumblebee,
    status: "ONLINE",
    greeting: "Hello Commander! Ready for today's mission?",
  },
  {
    id: "jazz",
    name: "Jazz",
    role: "Creative Strategist",
    image: jazz,
    status: "ONLINE",
    greeting: "Let's create something amazing today.",
  },
  {
    id: "ironhide",
    name: "Ironhide",
    role: "Security Director",
    image: ironhide,
    status: "ONLINE",
    greeting: "Security systems online and monitoring.",
  },
  {
    id: "ratchet",
    name: "Ratchet",
    role: "Systems Engineer",
    image: ratchet,
    status: "ONLINE",
    greeting: "Diagnostics complete. All systems operational.",
  },
];

export default function Home({
  workspaces,
  setCurrentWorkspaceId,
}) {
  const [currentBot, setCurrentBot] = useState(0);

  const activeWorkspace = workspaces[0] || null;
  const workspaceBots = activeWorkspace?.employees || [];

  const displayBots = workspaceBots.map((emp) => {
    const defaultMeta = autobots.find((a) => a.id === emp.id) || autobots[0];
    return {
      id: emp.id,
      name: emp.name,
      role: emp.role,
      image: autobotImages[emp.id] || autobotImages.prime,
      status: emp.status || "ONLINE",
      greeting: defaultMeta?.greeting || `Greetings Commander. I am ${emp.name}, ready to execute your directives in the ${emp.department} sector.`,
    };
  });

  const finalBots = displayBots.length > 0 ? displayBots : autobots;

  // Handle array bounds index safety
  const safeBotIndex = currentBot >= finalBots.length ? 0 : currentBot;

  return (
    <div className="min-h-full bg-slate-950 p-8 space-y-8 text-slate-100">
      <AISelector
        autobots={finalBots}
        currentBot={safeBotIndex}
        setCurrentBot={setCurrentBot}
      />

      <ChatBox
        bot={finalBots[safeBotIndex]}
        workspaceId={workspaces[0]?._id}
      />

      <WorkspaceCarousel
        workspaces={workspaces}
        setCurrentWorkspaceId={setCurrentWorkspaceId}
      />
    </div>
  );
}