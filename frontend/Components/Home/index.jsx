import { useState } from "react";

import AISelector from "./AISelector";
import ChatBox from "./ChatBox";
import WorkspaceCarousel from "./WorkspaceCarousel";

import prime from "../../src/assets/autobots/prime.png";
import bumblebee from "../../src/assets/autobots/bumblebee.png";
import jazz from "../../src/assets/autobots/jazz.png";
import ironhide from "../../src/assets/autobots/ironhide.png";
import ratchet from "../../src/assets/autobots/ratchet.png";

const autobots = [
  {
    id: 1,
    name: "Optimus Prime",
    role: "Chief AI Officer",
    image: prime,
    status: "ONLINE",
    greeting: "Greetings Commander. I am ready to assist you.",
  },
  {
    id: 2,
    name: "Bumblebee",
    role: "Communication Specialist",
    image: bumblebee,
    status: "ONLINE",
    greeting: "Hello Commander! Ready for today's mission?",
  },
  {
    id: 3,
    name: "Jazz",
    role: "Creative Strategist",
    image: jazz,
    status: "ONLINE",
    greeting: "Let's create something amazing today.",
  },
  {
    id: 4,
    name: "Ironhide",
    role: "Security Commander",
    image: ironhide,
    status: "ONLINE",
    greeting: "Security systems online and monitoring.",
  },
  {
    id: 5,
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

  return (

    <div className="p-8 space-y-8">

      <AISelector
        autobots={autobots}
        currentBot={currentBot}
        setCurrentBot={setCurrentBot}
      />

      <ChatBox
        bot={autobots[currentBot]}
      />

      <WorkspaceCarousel
        workspaces={workspaces}
        setCurrentWorkspaceId={setCurrentWorkspaceId}
      />

    </div>

  );

}