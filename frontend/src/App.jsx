import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/test`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <div style={{ padding: "30px", fontSize: "24px" }}>
      <h1>React + Express Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;