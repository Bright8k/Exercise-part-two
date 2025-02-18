import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DurationScreen() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  return (
    <div>
      <h1>Duration Exercise</h1>
      <p>Time: {time} seconds</p>
      <button onClick={() => setRunning(false)}>Stop Timer</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default DurationScreen;
