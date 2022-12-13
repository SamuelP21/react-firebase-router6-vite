import { async } from "@firebase/util";
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider"


const Register = () => {

    
    
    const {registerUser} = useContext(UserContext);
    const navegate = useNavigate();

    const {register, handleSubmit, formState: { errors }, getValues, setError} = useForm(); // el getValues ayuda para obtener los datos en el formulario para ver si la contraseña son iguales
                                                                      //setError para manejar los errores
    const onSubmit = async(data) => {
      //console.log(data)
      try {
          await registerUser(data.email, data.password);
          navegate('/');
      } catch (error) {
          console.log(error.code);
          switch (error.code) {
            case "auth/email-already-in-use":
                setError("email", {
                    message: "Usuario ya registrado",
                });
                break;
            case "auth/invalid-email":
                setError("email", {
                    message: "Formato email no válido",
                });
                break;
            default:
                console.log("Ocurrio un error en el server");
        }
    
      }
    };

    /*const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("procesando from: ", email, pass);
        try {
            await registerUser(email, pass);
            navegate('/');
        } catch (error) {
            console.log(error.code);
            alert("Este email ya esta registrado");
        }
        
    }*/

  return (
    <>
        
         <h1>Register</h1>
         <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="ingrese email" {...register("email", 
            {
              required: {
                  value: true,
                  message: "Campo obligatorio"
              },
              pattern: {
                value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                message: "Formato de email incorrecto",
              }
            })} />
            {errors.email && <p>{errors.email.message}</p>}
            <input type="password" placeholder="ingrese password"  {...register("password", {
              setValueAs: (v) => v.trim(),
              minLength: {
                value: 6,
                message: "Password minimo de 6 caracteres"
              },
              validate:{
                trim: (v) => {
                  if (!v.trim()) 
                    return  "llene el password";
                  return true;
                }  
              }
            })}/>
            {errors.password && <p>{errors.password.message}</p>}
            <input type="password" placeholder="ingrese password"  {...register("repassword",{
                setValueAs: (v) => v.trim(),
                validate: {
                   equialscontrasena: v => v === getValues("password") || "no coninside las contraseña" ,                  
                },
            })}/>
            {errors.repassword && <p>{errors.repassword.message}</p>}
            <button type="submit">registrar</button>
         </form>
    
    </>
  )
}

export default Register