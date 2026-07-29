const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

// Store all students
let students = [];

// Calculate Grade
function calculateGrade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";

  return "F";
}

// Get All Students
app.get("/students", (req, res) => {
  res.json(students);
});

// Add Student
app.post("/students", (req, res) => {
  const { name, score } = req.body;

  if (!name || score === undefined) {
    return res.status(400).json({
      message: "Please provide student name and score.",
    });
  }

  const student = {
    id: Date.now(),
    name,
    score: Number(score),
  };

  students.push(student);

  // Sort Highest to Lowest
  students.sort((a, b) => b.score - a.score);

  res.status(201).json(student);
});

// Update Student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  student.name = req.body.name;
  student.score = Number(req.body.score);

  students.sort((a, b) => b.score - a.score);

  res.json(student);
});

// Delete Student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter((item) => item.id !== id);

  res.json({
    message: "Student deleted successfully.",
  });
});

// Get Summary
app.get("/summary", (req, res) => {
  const totalStudents = students.length;

  const totalScore = students.reduce((sum, student) => {
    return sum + student.score;
  }, 0);

  const averageScore =
    totalStudents === 0
      ? 0
      : Number((totalScore / totalStudents).toFixed(1));

  const topStudent =
    students.length === 0
      ? null
      : students.reduce((highest, current) => {
          return current.score > highest.score
            ? current
            : highest;
        });

  res.json({
    totalStudents,
    averageScore,
    topStudent,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});