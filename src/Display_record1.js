import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
function DisplayRecord() {
    const [insertRecord, setInsertRecord] = useState([]);
    const [displayRecord, setDisplayRecord] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/getdata')
            .then(res => setInsertRecord(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:5000/getdata1')
            .then(res => setDisplayRecord(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div class="container m-3">
            <h2>Display Records</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {insertRecord.map((record, index) => (
                        <tr key={index}>
                            <td>{record.name}</td>
                            <td>{record.email}</td>
                            <td>{record.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Display Records from School Collection</h2>
            <table class="table">
                <tbody>
                    {displayRecord.map((record, index) => (
                        <tr key={index}>
                            <td><strong>Name:</strong> {record.name}</td>
                            <td><strong>Class:</strong> {record.class}</td>
                            <td><strong>Roll No:</strong> {record.rollno}</td>
                        </tr>
                    ))}
                </tbody>  
            </table>
        </div>
    );
}

export default DisplayRecord;

