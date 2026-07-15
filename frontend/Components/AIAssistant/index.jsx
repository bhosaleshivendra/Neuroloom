import { useState } from "react";

import Avatar from "../Avatar";
import ChatWindow from "../ChatWindow";


const AIAssistant = () => {


  const [open, setOpen] = useState(false);



  return (

    <>

      {!open && (

        <Avatar
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