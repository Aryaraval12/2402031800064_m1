import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function InsertRecordSchool(){
  const [form, setForm] = useState({
    name: "",
    stream: "",
    divison: "",
  });
  
  const handleChange = (e) => { 
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/insertrecord",form);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error sending data");
    }
  };
return (
  <div style={{ padding: "20px" }}>
  <h2>Simple Form</h2>
  <form onSubmit={handleSubmit}>
    <input
        type="text"
        name="name"
        className='form-control mt-3'
        placeholder="Enter Name"
        value={form.name}
        onChange={handleChange}
        />
    <input
        type="text"
        name="stream"
        className='form-control mt-3'
        placeholder="Enter stream"
        value={form.stream}
        onChange={handleChange}
    />
    <input
       type="text"
       name="divison"
       className='form-control mt-3'
       placeholder="Enter divison"
       value={form.divison}
       onChange={handleChange}
    />
    <button className='btn btn-primary mt-3' type="submit">Submit</button>
</form>
</div>
);
}
export default InsertRecordSchool;
 