import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState({ id: "id", email: "email" });

  useEffect(() => {
    const test = async () => {
      const data = await fetch("http://localhost:3000/test");
      setUser(await data.json());
    }
    test();
  }, []);

  return (
    <>
      <p>{user.id}</p>
      <p>{user.email}</p>
    </>
  )
}

export default App
