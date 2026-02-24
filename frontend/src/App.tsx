import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const test = async () => {
      const data = await fetch("http://localhost:30000/api/users");
      console.log(await data.json())
    }
    test();
  }, []);

  return (
    <>
    </>
  )
}

export default App
