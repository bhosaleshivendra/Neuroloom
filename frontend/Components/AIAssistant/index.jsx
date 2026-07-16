import { useState } from "react";

import Avatar from "../Avatar";
import ChatWindow from "../ChatWindow";

export default function AIAssistant({ workspace }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <Avatar
          workspace={workspace}
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <ChatWindow
          workspace={workspace}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}