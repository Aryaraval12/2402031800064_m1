import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [stu_table, setStu_table] = useState([]);
  const [form, setForm] = useState({ name: "", studentClass: "", marks: "", pr: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/student")
      .then(res => res.json())
      .then(data => setStu_table(data))
      .catch(err => console.error("Error fetching students:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStudent = async () => {
    try {
      const res = await fetch("http://localhost:5000/insertstudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newStu = await res.json();
      console.log("Added student:", newStu);
      setStu_table([...stu_table, newStu]);
      setForm({ name: "", Class: "", marks: "", pr: "" });
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:5000/student/${id}`, { method: "DELETE" });
      setStu_table(stu_table.filter(stu => stu._id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const updateStudent = async () => {
    try {
      const res = await fetch(`http://localhost:5000/student/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updatedStu = await res.json();
      setStu_table(stu_table.map(stu => stu._id === editId ? updatedStu : stu));
      setEditId(null);
      setForm({ name: "", studentClass: "", marks: "", pr: "" });
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const editStudent = (stu) => {
    setEditId(stu._id);
    setForm({ name: stu.name, studentClass: stu.studentClass, marks: stu.marks, pr: stu.pr });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Management</h1>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          {editId ? "Edit Student" : "Add New Student"}
        </div>
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <input className="form-control" name="studentClass" placeholder="Class" value={form.studentClass} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <input className="form-control" name="marks" placeholder="Marks" value={form.marks} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <input className="form-control" name="pr" placeholder="PR" value={form.pr} onChange={handleChange} />
            </div>
          </div>
          {editId ? (
            <button className="btn btn-warning mt-3 w-100" onClick={updateStudent}>Save Changes</button>
          ) : (
            <button className="btn btn-success mt-3 w-100" onClick={addStudent}>Add Student</button>
          )}
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">Student List</div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Marks</th>
                <th>PR</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stu_table.map(stu => (
                <tr key={stu._id}>
                  <td>{stu.name}</td>
                  <td>{stu.studentClass}</td>
                  <td>{stu.marks}</td>
                  <td>{stu.pr}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => editStudent(stu)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(stu._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {stu_table.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
