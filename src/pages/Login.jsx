import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"


const Login = () => {

 const {user,setUser} = useContext(UserContext)
 const navegate = useNavigate()
 //console.log(user)
  const handleClickLogin = () => {
    setUser(true)
    navegate("/")
  }
  return (
    <div>
      <h1>Login</h1>
      <h2>{ user ? "En linea" : "Offline" }</h2>
      <button onClick={handleClickLogin}>Acceder</button>
    </div>
  )
}

export default Login