import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const addOrUpdateTodo = () => {
    if (!user || !task || !date) {
      setError("All fields are required");
      return;
    }

    if (date < today) {
      setError("Past dates are not allowed");
      return;
    }

    if (editIndex !== null) {
      // ✏️ Update
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        user,
        task,
        date
      };
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // ➕ Add
      setTodos((prev) => [
        ...prev,
        { user, task, date, completed: false }
      ]);
    }

    setUser("");
    setTask("");
    setDate("");
    setError("");
  };

  // ✅ Toggle completed
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // ❌ Delete
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // ✏️ Edit
  const editTodo = (index) => {
    const t = todos[index];
    setUser(t.user);
    setTask(t.task);
    setDate(t.date);
    setEditIndex(index);
  };

  // 🔍 Search
  const filteredTodos = todos.filter(
    (t) =>
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="card">
        <h2>Todo App</h2>

        <input
          type="text"
          placeholder="User name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="button" onClick={addOrUpdateTodo}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>

        <input
          type="text"
          placeholder="Search by user or task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <ul className="list">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`list-item ${todo.completed ? "done" : ""}`}
            >
              <input
  type="checkbox"
  checked={todo.completed}
  onChange={() => toggleComplete(index)}
  style={{ marginTop: "5px" }}
/>


              <span>
                👤 <b>{todo.user}</b><br />
                📝 {todo.task}<br />
                📅 {todo.date}
              </span>

              <div className="actions">
                <button onClick={() => editTodo(index)}>✏️</button>
                <button onClick={() => deleteTodo(index)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
