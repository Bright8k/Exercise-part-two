import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';

const exercises = [
  { name: 'Push-ups', type: 'repetition' },
  { name: 'Jumping Jacks', type: 'duration' },
];

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
      <h1>Running</h1>
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
      <h1>Pushups</h1>
      <p>Reps: {reps}</p>
      <button onClick={() => setReps(reps + 1)}>+</button>
      <button onClick={() => setReps(reps - 1)}>-</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const renderExercise = () => {
    if (!selectedExercise) return (
      <div>
        <h1>Choose an Exercise</h1>
        {exercises.map((exercise) => (
          <button key={exercise.name} onClick={() => setSelectedExercise(exercise)}>
            {exercise.name}
          </button>
        ))}
      </div>
    );

    return selectedExercise.type === 'repetition' ? (
      <RepetitionExercise name={selectedExercise.name} />
    ) : (
      <DurationExercise name={selectedExercise.name} />
    );
  };

  return <div>{renderExercise()}</div>;
}
