
import { useEffect } from 'react';
import './App.css'
import myRouter from './Router'
import { RouterProvider } from 'react-router-dom'

function App() {
  
  useEffect(() => {
    console.log(window.location.origin);
  }, []);

  
  return (
    <>
     <RouterProvider router={myRouter} />
    </>
  )
}

export default App
