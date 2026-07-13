import { useState } from "react";

import Godfather from "../Avatars/Godfather";
import ChatWindow from "../ChatWindow";

const AIAssistant = () => {

  const [open, setOpen] = useState(false);

  return (
    <>

      {!open && (
        <Godfather
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <ChatWindow
          onClose={() => setOpen(false)}
        />
      )}

    </>
  );
};

export default AIAssistant;