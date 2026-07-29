const API_URL = "http://localhost:3002";

// Get All Students
export async function getStudents() {
  const response = await fetch(`${API_URL}/students`);

  return response.json();
}

// Create Student
export async function createStudent(student) {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(student),
  });

  return response.json();
}

// Update Student
export async function updateStudent(id, student) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(student),
  });

  return response.json();
}

// Delete Student
export async function deleteStudent(id) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });

  return response.json();
}

// Get Summary
export async function getSummary() {
  const response = await fetch(`${API_URL}/summary`);

  return response.json();
}