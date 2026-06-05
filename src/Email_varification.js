import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EmailForm(){
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/send-email", formData);
      setMessage(res.data);
    } catch (err) {
      setMessage("Error sending email");
      console.error(err);
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Email Verification</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Enter email_id</label>
          <input
            type="email"
            name="to"
            className="form-control"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="text"
            className="form-control"
            rows="4"
            value={formData.text}
            onChange={handleChange}
            required>
            </textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Email
        </button>
      </form>

      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}
export default EmailForm;