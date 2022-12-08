import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { UserContext } from './context/UserProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'

const App = () => {

  const {user} = useContext(UserContext)

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
        </Routes>
    
    </>
  )
}

export default App