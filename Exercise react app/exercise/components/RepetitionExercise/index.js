import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default RepetitionScreen;
