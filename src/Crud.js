import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeSection, setActiveSection] = useState("insert");

  return (
    <div className="container-fluid  mt-4">
      <ul className="nav nav-tabs bg-light nav-pills nav-justified p-2 gap-2">
        <li className="nav-item btn-secondary">
          <button
            className={`nav-link ${activeSection === "insert" ? "active" : ""}`}
            onClick={() => setActiveSection("insert")}
          >
            Insert
          </button>
        </li>
        <li className="nav-item btn-secondary">
          <button
            className={`nav-link ${activeSection === "show" ? "active" : ""}`}
            onClick={() => setActiveSection("show")}
          >
            Show
          </button>
        </li>
        <li className="nav-item btn-secondary">
          <button
            className={`nav-link ${activeSection === "update" ? "active" : ""}`}
            onClick={() => setActiveSection("update")}
          >
            Update
          </button>
        </li>
        <li className="nav-item btn-secondary">
          <button
            className={`nav-link ${activeSection === "delete" ? "active" : ""}`}
            onClick={() => setActiveSection("delete")}
          >
            Delete
          </button>
        </li>
      </ul>

      <div className="mt-3">
        {activeSection === "insert" && <InsertSection />}
        {activeSection === "show" && <ShowSection />}
        {activeSection === "update" && <UpdateSection />}
        {activeSection === "delete" && <DeleteSection />}
      </div>
    </div>
  );
}

function InsertSection() {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInsert = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/insert", {
      name: formData.name,
      department: formData.department,
      designation: formData.designation
    });
    alert(res.data);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div>
      <h3>Insert Employee</h3>
      <input
        type="text"
        className="form-control mb-2"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control mb-2"
        name="department"
        placeholder="Enter department"
        value={formData.department}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control mb-2"
        name="designation"
        placeholder="Enter designation"
        value={formData.designation}
        onChange={handleChange}
      />
      <button className="btn btn-primary" onClick={handleInsert}>
        Insert
      </button>
    </div>
  );
}

function ShowSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h3>Employee List</h3>
      <ul className="list-group">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            <tr>
              <td>
                <strong>ID:</strong><br />
                <strong>Name:</strong> {item.name} <br />
                <strong>Department:</strong> {item.department} <br />
                <strong>Designation:</strong> {item.designation}
              </td>
            </tr>
            <button className="btn btn-danger btn-sm float-end" onClick={() => {axios.delete(`http://localhost:5000/delete/api/employees/${item.name}`)
            .then((res) => {
              alert(res.data);
              setData(data.filter(emp => emp.id !== item.id));
            })
            .catch((err) => console.error(err));   
            }}>Delete</button>
          </li>
          

        ))}
      </ul>
    </div>
  );
}

function UpdateSection() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "",
    designation: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/employees/${formData.id}`, {
        name: formData.name,
        department: formData.department,
        designation: formData.designation
      });
      alert(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Update Employee</h3>
      <input
        type = "text"
        className="form-control mb-2"
        name="id"
        placeholder="Enter employee ID"
        value={formData.id}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control mb-2"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control mb-2"
        name="department"
        placeholder="Enter department"
        value={formData.department}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control mb-2"
        name="designation"
        placeholder="Enter designation"
        value={formData.designation}
        onChange={handleChange}
      />
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}

function DeleteSection() {
  const [name, setName] = useState("");

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/employees/${name}`);
      alert(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Delete Employee</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter name to delete"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
export default App;