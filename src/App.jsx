import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  // today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  const addTodo = () => {
    if (task.trim() === "") {
      setError("Task name is required");
      return;
    }

    if (!dueDate) {
      setError("Please select a due date");
      return;
    }

    if (dueDate < today) {
      setError("Past dates are not allowed");
      return;
    }

    setTodos([...todos, { task, dueDate }]);
    setTask("");
    setDueDate("");
    setError("");
  };

  return (
    <div className="app">
      <div className="card">
        <h2>Todo List</h2>

        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          min={today}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={addTodo}>Add Todo</button>

        <ul className="list">
          {todos.map((todo, index) => (
            <li key={index} className="list-item">
              📝 {todo.task}
              <br />
              📅 Due: {todo.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
