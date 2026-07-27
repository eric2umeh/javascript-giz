import { Link } from 'react-router-dom';

function TodoList({ todos }: { todos: string[] }) {
  return (
    <div>
      <ul>{todos.map((t, i) => <li key={i}>{t}</li>)}</ul>
      <Link to="/add">+ Add a task</Link>
    </div>
  );
}


export default TodoList
