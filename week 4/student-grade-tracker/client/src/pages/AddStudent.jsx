import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/giz-logo.png";

import { createStudent, getStudents, getSummary } from "../api/studentApi";

function AddStudent() {
  // Store form values
  const [form, setForm] = useState({
    name: "",
    score: "",
  });

  // Store students
  const [students, setStudents] = useState([]);

  // Store summary
  const [summary, setSummary] = useState({
    totalStudents: 0,
    averageScore: 0,
    topStudent: null,
  });

  // Load page
  useEffect(() => {
    loadData();
  }, []);

  // Load students and summary
  async function loadData() {
    const list = await getStudents();
    setStudents(list);

    const data = await getSummary();
    setSummary(data);
  }

  // Handle typing
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  // Add Student
  async function handleSubmit(event) {
    event.preventDefault();

    if (form.name.trim() === "" || form.score === "") {
      alert("Please complete all fields.");
      return;
    }

    await createStudent({
      name: form.name,
      score: Number(form.score),
    });

    setForm({
      name: "",
      score: "",
    });

    loadData();
  }

  return (
    <div className="page">
      <div className="container">
        {/* Logo */}

        <img src={logo} alt="GIZ Logo" className="logo" />

        {/* Page Heading */}

        <p className="eyebrow">STUDENT MANAGEMENT</p>

        <h1>Student Grade Tracker</h1>

        <p className="subtitle">
          Add students, calculate grades and monitor class performance.
        </p>

        {/* Add Student Card */}

        <div className="card">
          <h2>Add Student</h2>

          <form className="transaction-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="number"
              name="score"
              placeholder="Student Score"
              min="0"
              max="100"
              value={form.score}
              onChange={handleChange}
            />

            <button>Add Student</button>
          </form>
        </div>

        {/* Summary */}

        <div className="summary-grid">
          <div className="summary-card income">
            <h3>Total Students</h3>

            <h2>{summary.totalStudents}</h2>
          </div>

          <div className="summary-card expense">
            <h3>Class Average</h3>

            <h2>{summary.averageScore}</h2>
          </div>

          <div className="summary-card balance">
            <h3>Top Student</h3>

            <h2>{summary.topStudent ? summary.topStudent.name : "N/A"}</h2>
          </div>
        </div>

        {/* Bottom Section */}

        <div className="bottom-grid">
          {/* Class Statistics */}

          <div className="card">
            <h2>Class Statistics</h2>

            <div className="category-row">
              <span>Total Students</span>

              <strong>{summary.totalStudents}</strong>
            </div>

            <div className="category-row">
              <span>Average Score</span>

              <strong>{summary.averageScore}</strong>
            </div>

            <div className="category-row">
              <span>Highest Score</span>

              <strong>
                {summary.topStudent ? summary.topStudent.score : 0}
              </strong>
            </div>
          </div>

          {/* Recent Students */}

          <div className="card">
            <div className="section-header">
              <h2>Recent Students</h2>

              <Link to="/students" className="view-link">
                View All →
              </Link>
            </div>

            {students.length === 0 ? (
              <p className="empty">No students added.</p>
            ) : (
              students.slice(0, 5).map((student) => (
                <div key={student.id} className="recent-item">
                  <div>
                    <strong>{student.name}</strong>

                    <p>
                      Grade{" "}
                      {student.score >= 70
                        ? "A"
                        : student.score >= 60
                          ? "B"
                          : student.score >= 50
                            ? "C"
                            : student.score >= 40
                              ? "D"
                              : "F"}
                    </p>
                  </div>

                  <strong>{student.score}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
