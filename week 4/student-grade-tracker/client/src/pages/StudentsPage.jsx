import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/giz-logo.png";

import {
  getStudents,
  updateStudent,
  deleteStudent,
  getSummary,
} from "../api/studentApi";

function StudentsPage() {
  // Store all students
  const [students, setStudents] = useState([]);

  // Store summary
  const [summary, setSummary] = useState({
    totalStudents: 0,
    averageScore: 0,
    topStudent: null,
  });

  // Store editing student
  const [editingId, setEditingId] = useState(null);

  // Store edit form
  const [editForm, setEditForm] = useState({
    name: "",
    score: "",
  });

  // Load page
  useEffect(() => {
    loadData();
  }, []);

  // Load students and summary
  async function loadData() {
    const data = await getStudents();
    setStudents(data);

    const totals = await getSummary();
    setSummary(totals);
  }

  // Delete student
  async function handleDelete(id) {
    const answer = window.confirm("Delete this student?");

    if (!answer) return;

    await deleteStudent(id);

    loadData();
  }

  // Start editing
  function startEdit(student) {
    setEditingId(student.id);

    setEditForm({
      name: student.name,
      score: student.score,
    });
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null);
  }

  // Handle edit input
  function handleEditChange(event) {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  }

  // Save student
  async function saveEdit(id) {
    await updateStudent(id, {
      name: editForm.name,
      score: Number(editForm.score),
    });

    setEditingId(null);

    loadData();
  }

  // Calculate Grade
  function grade(score) {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 40) return "D";

    return "F";
  }

  // Pass or Fail
  function status(score) {
    return score >= 40 ? "Pass" : "Fail";
  }

  return (
    <div className="page">
      <div className="container">
        <img src={logo} alt="GIZ Logo" className="logo" />

        <div className="page-header">
          <div>
            <p className="eyebrow">STUDENT MANAGEMENT</p>

            <h1>Student Grade Tracker</h1>

            <p className="subtitle">View, edit and manage students.</p>
          </div>

          <Link to="/" className="primary-button">
            + Add Student
          </Link>
        </div>

        {/* Summary */}

        <div className="summary-grid">
          <div className="summary-card income">
            <h3>Total Students</h3>

            <h2>{summary.totalStudents}</h2>
          </div>

          <div className="summary-card expense">
            <h3>Average Score</h3>

            <h2>{summary.averageScore}</h2>
          </div>

          <div className="summary-card balance">
            <h3>Top Student</h3>

            <h2>{summary.topStudent ? summary.topStudent.name : "N/A"}</h2>
          </div>
        </div>

        {/* Student Table */}

        <div className="card">
          <div className="section-header">
            <h2>Student List</h2>
          </div>

          <table className="transaction-table">
            <thead>
              <tr>
                <th>#</th>

                <th>Name</th>

                <th>Score</th>

                <th>Grade</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table">
                    No students added.
                  </td>
                </tr>
              ) : (
                students.map((student, index) =>
                  editingId === student.id ? (
                    <tr key={student.id}>
                      <td>{index + 1}</td>

                      <td>
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="score"
                          value={editForm.score}
                          onChange={handleEditChange}
                        />
                      </td>

                      <td>{grade(editForm.score)}</td>

                      <td>{status(editForm.score)}</td>

                      <td>
                        <button
                          className="save-btn"
                          onClick={() => saveEdit(student.id)}
                        >
                          Save
                        </button>

                        <button className="cancel-btn" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={student.id}>
                      <td>{index + 1}</td>

                      <td>{student.name}</td>

                      <td>{student.score}</td>

                      <td>
                        <span
                          className={
                            student.score >= 70
                              ? "badge income-badge"
                              : student.score >= 40
                                ? "badge balance-badge"
                                : "badge expense-badge"
                          }
                        >
                          {grade(student.score)}
                        </span>
                      </td>

                      <td>{status(student.score)}</td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => startEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentsPage;
