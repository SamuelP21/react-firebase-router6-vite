import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"


const Login = () => {

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const {loginUser} = useContext(UserContext);
  const navegate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("procesando from: ", email, pass);
    try {
        await loginUser(email, pass);
        console.log("Usuario logeado");
        navegate('/');
    } catch (error) {
        console.log(error.code);
        alert("Este email ya esta registrado");
    }
    
}

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
            <input type="email" placeholder="ingrese email" value={email} onChange = {(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="ingrese password" value={pass} onChange = {(e) => setPass(e.target.value)} />
            <button type="submit">Login</button>
         </form>
     
    </div>
  )
}

export default Login