import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "/api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try {
      const r = await axios.get(API + "/todos");
      setTodos(r.data);
    } catch (err) {
      console.error("Failed to load todos", err);
    }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title) return;
    await axios.post(API + "/todos", { title });
    setTitle("");
    load();
  };

  const toggle = async (id, completed) => {
    await axios.put(API + "/todos/" + id, { completed: !completed });
    load();
  };

  const del = async (id) => {
    await axios.delete(API + "/todos/" + id);
    load();
  };

  const filtered = todos.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Advanced Todo App</h1>

      <div className="inputRow">
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="What needs to be done?"
          onKeyPress={(e) => e.key === 'Enter' && add()} // Optional: Add on Enter
        />
        <button onClick={add}>Add</button>
      </div>

      <div className="filters">
        <button 
          className={filter === "all" ? "active-filter" : ""} 
          onClick={() => setFilter("all")}
        >All</button>
        <button 
          className={filter === "active" ? "active-filter" : ""} 
          onClick={() => setFilter("active")}
        >Active</button>
        <button 
          className={filter === "done" ? "active-filter" : ""} 
          onClick={() => setFilter("done")}
        >Done</button>
      </div>

      <ul>
        {filtered.map(t => (
          <li key={t.id} className={t.completed ? "done" : ""}>
            <span onClick={() => toggle(t.id, t.completed)}>{t.title}</span>
            <button onClick={() => del(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}