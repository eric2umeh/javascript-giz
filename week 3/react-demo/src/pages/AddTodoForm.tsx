import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddTodoForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");
  const navigate = useNavigate();
 
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text);
    navigate("/");        // back to the list after adding
  }
 
  return (
        <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}


export default AddTodoForm
