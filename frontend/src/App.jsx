import { useEffect, useState } from "react";
import "./App.css";
import { API_URL } from "./config";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/test`
        );

        const data = await response.json();

        setMessage(data.message);
      } catch (error) {
        console.error(error);
        setMessage("Failed to connect to backend");
      }
    }

    getData();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;