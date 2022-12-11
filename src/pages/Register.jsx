import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider"


const Register = () => {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    const {registerUser} = useContext(UserContext);

    const navegate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("procesando from: ", email, pass);
        try {
            await registerUser(email, pass);
            navegate('/');
        } catch (error) {
            console.log(error.code);
            alert("Este email ya esta registrado");
        }
        
    }

  return (
    <>
        
         <h1>Register</h1>
         <form onSubmit={handleSubmit}>
            <input type="email" placeholder="ingrese email" value={email} onChange = {(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="ingrese password" value={pass} onChange = {(e) => setPass(e.target.value)} />
            <button type="submit">registrar</button>
         </form>
    
    </>
  )
}

export default Register