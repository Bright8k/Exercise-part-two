import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

function HomeScreen() {
  return (
    <div>
      <h1>Exercise App</h1>
      <button><Link to="/duration">Duration Exercise</Link></button>
      <button><Link to="/repetition">Repetition Exercise</Link></button>
      <button><Link to="/running">Running Exercise</Link></button>
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

function RunningExercise() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [laps, setLaps] = useState([]);
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

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div>
      <h1>Running Exercise</h1>
      <p>Time: {time} seconds</p>
      <button onClick={() => setRunning(false)}>Stop Timer</button>
      <button onClick={recordLap}>Record Lap</button>
      <button onClick={() => navigate("/")}>Back</button>
      <h2>Laps</h2>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {lap} seconds</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/duration" element={<DurationScreen />} />
        <Route path="/repetition" element={<RepetitionScreen />} />
        <Route path="/running" element={<RunningExercise />} />
      </Routes>
    </Router>
  );
}

export default App;
