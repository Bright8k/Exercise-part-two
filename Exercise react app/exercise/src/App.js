import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import DurationScreen from "./screens/DurationScreen";
import RepetitionScreen from "./screens/RepetitionScreen";


function HomeScreen() {
  return (
    <div>
      <h1>Exercise App</h1>
      <button><Link to="/DurationExercise">Duration Exercise</Link></button>
      <button><Link to="/RepetitionExercise">Repetition Exercise</Link></button>
    </div>
  );
}

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

function RepetitionScreen() {
  const [reps, setReps] = useState(0);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Repetition Exercise</h1>
      <p>Reps: {reps}</p>
      <button onClick={() => setReps(reps + 1)}>+</button>
      <button onClick={() => setReps(reps - 1)}>-</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/DurationExercise" element={<DurationScreen />} />
        <Route path="/RepetitionExercise" element={<RepetitionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
