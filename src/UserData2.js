import React,{ useState } from 'react';

const usersData1 = [
    { name:"Arya"},
    { name:"Priyanshu"},
    { name:"harit"},
];
const usersData2 = [
    {designation:"junior developer"},
    {designation:"developer"},
    {designation:"senior developer"},
];

export default function Userdata() {
   const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
 
    const index = usersData1.findIndex((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setSelectedIndex(index !== -1 ? index : null);
  };
    return (
        <div>
<input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />
 
      <ul>
        {usersData1.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
        {selectedIndex !== null && (
          <li>
            
            <strong>{usersData1[selectedIndex].name}</strong> — {usersData2[selectedIndex].designation}
          </li>
        )}
      </ul>
 
        </div>
    );
}                       