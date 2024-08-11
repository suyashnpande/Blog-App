import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Blogs from './pages/blog/Blogs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-bgPrimary min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex-grow '>
          <Outlet/>
        </div>
        <Blogs/>
        <footer className='mt-auto'>footer</footer>
      </div>
    </>
  )
}

export default App
