import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import TodoList from "./pages/TodoList.js";
import AddTodoForm from "./pages/AddTodoForm.js";

export default function App() {
  const [todos, setTodos] = useState<string[]>([]);

  function addTodo(text: string) {
    setTodos((currentTodos) => [...currentTodos, text.trim()]);
  }

  return (
    <Routes>
      <Route path="/" element={<TodoList todos={todos} />} />
      <Route path="/add" element={<AddTodoForm onAdd={addTodo} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
