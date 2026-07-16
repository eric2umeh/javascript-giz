let editIndex = -1;

// Store all students
const students = [];

// Get HTML elements
const studentName = document.getElementById("studentName");
const studentScore = document.getElementById("studentScore");
const addBtn = document.getElementById("addBtn");

const studentTable = document.getElementById("studentTable");

const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");
const topStudent = document.getElementById("topStudent");

// Calculate Grade
function grade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";

  return "F";
}

// Display Students
function render() {
  studentTable.innerHTML = "";

  if (students.length === 0) {
    studentTable.innerHTML = `<tr>
            <td colspan="6">No students added.</td>
        </tr>`;

    totalStudents.textContent = 0;
    averageScore.textContent = 0;
    topStudent.textContent = "N/A";

    return;
  }

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    const studentGrade = grade(student.score);

    if (studentGrade === "A" || studentGrade === "B") {
      row.classList.add("grade-a");
    } else if (studentGrade === "C" || studentGrade === "D") {
      row.classList.add("grade-c");
    } else {
      row.classList.add("grade-f");
    }

    const status = student.score >= 40 ? "Pass" : "Fail";

    row.innerHTML = `

        <td>${index + 1}</td>

        <td>${student.name}</td>

        <td>${student.score}</td>

        <td>${studentGrade}</td>

        <td>${status}</td>

        <td>
          <button class="edit" data-index="${index}">
              Edit
          </button>

          <button class="delete" data-index="${index}">
              Delete
          </button>
        </td>

        `;

    studentTable.appendChild(row);
  });

  // Total Students

  totalStudents.textContent = students.length;

  // Average Score

  const total = students.reduce((sum, student) => {
    return sum + student.score;
  }, 0);

  averageScore.textContent = (total / students.length).toFixed(1);

  // Top Student

  const top = students.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
  });

  topStudent.textContent = `${top.name} (${top.score})`;
}

// Add Student
addBtn.onclick = () => {
  const name = studentName.value.trim();

  const score = Number(studentScore.value);

  if (name === "" || isNaN(score)) {
    alert("Please enter a valid name and score.");

    return;
  }

  if (editIndex === -1) {
    students.push({
      name,
      score,
    });
  } else {
    students[editIndex].name = name;
    students[editIndex].score = score;

    editIndex = -1;

    addBtn.textContent = "Add Student";
  }

  // Highest to Lowest

  students.sort((a, b) => b.score - a.score);

  studentName.value = "";
  studentScore.value = "";

  render();
};

// Delete Student

studentTable.onclick = (event) => {
  if (event.target.classList.contains("delete")) {
    students.splice(event.target.dataset.index, 1);

    render();
  } else if (event.target.classList.contains("edit")) {
    const index = event.target.dataset.index;

    studentName.value = students[index].name;
    studentScore.value = students[index].score;

    editIndex = index;

    addBtn.textContent = "Update Student";
  }
};

// Initial Display

render();
