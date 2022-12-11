import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"


const NavBar = () => {

  const {user, singOutUser} = useContext(UserContext)

  const handleClickLogOut = async() => {
    try {      
      await singOutUser();
    } catch (error) {
      console.log(error.code);
    }
  }

  return (
    <div>
       {
         user ? (
           <>
              <NavLink to='/' >Home</NavLink> 
              <button onClick={handleClickLogOut}>Logout </button>
            </>
          )
          : (
            <>
              <NavLink to='/login' >Login |</NavLink>
              <NavLink to='/register' >Register |</NavLink>
              
            </>
          )
        }
        {/*<NavLink to='/' >Home</NavLink>
        <NavLink to='/login' >Login</NavLink>*/}
    </div>
  )
}

export default NavBar