import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function DisplayRecord(){
    const [records, setRecords] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.get("http://localhost:5000/api/displayrecord");
    alert(res.data.message);
    setRecords(res.data);
  } catch (err) {
    console.error(err);
    alert("Error sending data");
  }
};

return (
  <div>
    <h2> Data will display here... </h2>
    {records.map((item, index) => (
      <div key={index}>
        <br/>
        <div>Name: {item.name}</div>
        <div>Department: {item.department}</div>
        <div>Designation: {item.designation}</div>
      </div>
    ))}
    <button onClick={handleSubmit}> Show Data</button>
  </div>
);

}
export default DisplayRecord;