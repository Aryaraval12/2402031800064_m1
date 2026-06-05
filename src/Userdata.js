import React,{useState , useMemo} from 'react';

const usersData = [
  {id: 1, name: "Alice"},
  {id: 2, name: "Bob" },
  {id: 3, name: "Charlie"},
];
export default function RealTimeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("true");

  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");
    return usersData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style ={{backgroundColor:theme ? "#096fff":"#fff"}}>
        <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={() => setTheme(!theme)}>Toggle Theme</button>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
  );
}