import React, { useState } from "react";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newHabit.trim();
    if (!trimmed) return;
    const habit = {
      id: Date.now() + Math.random(),
      name: trimmed,
      completed: false,
    };
    setHabits((prev) => [...prev, habit]);
    setNewHabit("");
    setShowInput(false);
  };

  // ---------- Styles ----------
  const containerStyle = {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "1rem",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#333",
  };
  const titleStyle = {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "1.8rem",
    color: "#2c3e50",
  };
  const listStyle = {
    listStyle: "none",
    padding: 0,
    marginBottom: "1rem",
  };
  const itemStyle = {
    background: "#f9f9f9",
    marginBottom: "0.5rem",
    padding: "0.75rem",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
  };
  const labelStyle = { display: "flex", alignItems: "center", cursor: "pointer", width: "100%" };
  const checkboxStyle = { marginRight: "0.75rem", width: "1rem", height: "1rem" };
  const textStyle = { fontSize: "1rem" };
  const completedTextStyle = { ...textStyle, textDecoration: "line-through", color: "#888" };
  const primaryButtonStyle = {
    background: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  };
  const addButtonStyle = {
    ...primaryButtonStyle,
    marginRight: "0.5rem",
  };
  const cancelButtonStyle = {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  };
  const formStyle = { display: "flex", alignItems: "center", marginBottom: "1rem" };
  const inputStyle = {
    flexGrow: 1,
    padding: "0.5rem",
    fontSize: "1rem",
    marginRight: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Habit Tracker</h1>
      <ul style={listStyle}>
        {habits.map((habit) => (
          <li key={habit.id} style={itemStyle}>
            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                aria-label={`Mark ${habit.name} as ${habit.completed ? "incomplete" : "completed"} for today`}
                style={checkboxStyle}
              />
              <span style={habit.completed ? completedTextStyle : textStyle}>
                {habit.name}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {showInput ? (
        <form onSubmit={handleAdd} style={formStyle}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Habit name"
            aria-label="New habit name"
            style={inputStyle}
            autoFocus
          />
          <button type="submit" style={addButtonStyle}>Add</button>
          <button type="button" onClick={() => setShowInput(false)} style={cancelButtonStyle}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setShowInput(true)} style={primaryButtonStyle}>Add Habit</button>
      )}
    </div>
  );
}
