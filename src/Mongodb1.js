import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({ name: "", dept: "", desig: "", salary: "" });
 
  useEffect(() => {

    fetch("http://localhost:5000/employees")

      .then(res => res.json())

      .then(data => setEmployees(data));

  }, []);
 
  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });

  };
 
  const addEmployee = async () => {

    await fetch("http://localhost:5000/employees", {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(form),

    });

    setEmployees([...employees, form]);

    setForm({ name: "", dept: "", desig: "", salary: "" }); // reset form

  };
 
  const deleteEmployee = async (id) => {

    await fetch(`http://localhost:5000/employees/${id}`, { method: "DELETE" });

    setEmployees(employees.filter(emp => emp._id !== id));

  };
 
  const updateEmployee = async (id) => {

    await fetch(`http://localhost:5000/employees/${id}`, {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(form),

    });

    setEmployees(employees.map(emp => emp._id === id ? { ...emp, ...form } : emp));

  };
 
  return (
<div className="container mt-5">
<h1 className="text-center mb-4">Employee Management</h1>
 
      {/* Employee Form */}
<div className="card shadow-sm mb-4">
<div className="card-header bg-primary text-white">Add New Employee</div>
<div className="card-body">
<div className="row g-2">
<div className="col-md-3">
<input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
</div>
<div className="col-md-3">
<input className="form-control" name="dept" placeholder="Dept" value={form.dept} onChange={handleChange} />
</div>
<div className="col-md-3">
<input className="form-control" name="desig" placeholder="Designation" value={form.desig} onChange={handleChange} />
</div>
<div className="col-md-3">
<input className="form-control" name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} />
</div>
</div>
<button className="btn btn-success mt-3 w-100" onClick={addEmployee}>Add Employee</button>
</div>
</div>
 
      {/* Employee Table */}
<div className="card shadow-sm">
<div className="card-header bg-secondary text-white">Employee List</div>
<div className="card-body">
<table className="table table-striped table-hover">
<thead className="table-dark">
<tr>
<th>Name</th>
<th>Dept</th>
<th>Designation</th>
<th>Salary</th>
<th>Actions</th>
</tr>
</thead>
<tbody>

              {employees.map(emp => (
<tr key={emp._id}>
<td>{emp.name}</td>
<td>{emp.dept}</td>
<td>{emp.desig}</td>
<td>₹{emp.salary}</td>
<td>
<button className="btn btn-primary btn-sm me-2" onClick={() => updateEmployee(emp._id)}>Update</button>
<button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(emp._id)}>Delete</button>
</td>
</tr>

              ))}
</tbody>
</table>
</div>
</div>
</div>

  );

}
export default App;


 