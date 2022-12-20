import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { UserContext } from './context/UserProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import LayoutRequireAuth from './components/layout/LayoutRequireAuth'
import Register from './pages/Register'
import LayoutContainerForm from './components/layout/LayoutContainerForm'
import PerfilUser from './pages/PerfilUser'
import NotFount from './pages/NotFount'
import LayoutRedirect from './components/layout/LayoutRedirect'

const App = () => {

  const {user} = useContext(UserContext)

  if (user === false) {
    return <p>Loading...</p>
  }

  return (
    <>
      <NavBar/>
      
        <Routes>        

        <Route path='/' element={<LayoutRequireAuth/>}>
            <Route index element={<Home/>} />
            <Route path='/perfil' element={<PerfilUser/>} />
        </Route>

          <Route path='/' element={<LayoutContainerForm/>}>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
          </Route>

          <Route path='/:nanoid' element={<LayoutRedirect/>}>
            <Route index element={<NotFount /> }/>
          </Route>
          {/** <Route path="*" element={<NotFount /> }/> */}

        </Routes>
    
    </>
  )
}

export default App