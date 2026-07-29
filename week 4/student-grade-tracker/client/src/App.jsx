import { Routes, Route } from "react-router-dom";

import AddStudent from "./pages/AddStudent";
import StudentsPage from "./pages/StudentsPage";

// Main Application
function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<AddStudent />}
      />

      <Route
        path="/students"
        element={<StudentsPage />}
      />

    </Routes>
  );
}

export default App;