import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"


const NavBar = () => {

  const {user, setUser} = useContext(UserContext)

  return (
    <div>
       {
          user ? (
            <>
              <NavLink to='/' >Home</NavLink> 
              <button onClick={() => setUser(false)}>Logout</button>
            </>
          )
          : (
            <NavLink to='/login' >Login</NavLink>
          )
        }
        {/*<NavLink to='/' >Home</NavLink>
        <NavLink to='/login' >Login</NavLink>*/}
    </div>
  )
}

export default NavBar