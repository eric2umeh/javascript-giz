import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js"
import About from "./pages/About.js"
import Contact from "./pages/Contact.js"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

