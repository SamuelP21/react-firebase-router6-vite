import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { UserContext } from './context/UserProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import Register from './pages/Register'

const App = () => {

  const {user} = useContext(UserContext)

  if (user === false) {
    return <p>Loading...</p>
  }

  return (
    <>
      <NavBar/>
      <div>App</div>
        <Routes>        
          <Route path="/" element={
              <RequireAuth>
                <Home/>
              </RequireAuth>
            } />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
    
    </>
  )
}

export default App