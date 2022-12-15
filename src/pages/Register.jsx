import { async } from "@firebase/util";
import { useContext } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import FromInput from "../components/FromInput";
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";


const Register = () => {

    
    
    const {registerUser} = useContext(UserContext);
    const navegate = useNavigate();
    const {required, patternEmail, minLength6, valifateTrim, validateEquialsPassword} = formValidate()

    const {register, handleSubmit, formState: { errors }, getValues, setError} = useForm(); // el getValues ayuda para obtener los datos en el formulario para ver si la contraseña son iguales
                                                                      //setError para manejar los errores

    
    const onSubmit = async(data) => {
      //console.log(data)
      try {
          await registerUser(data.email, data.password);
          navegate('/');
      } catch (error) {
          console.log(error.code);
          setError("firebase", {
              message: erroresFirebase(error.code),
          });
          
    
      }
    };



  return (
    <>
        
         <h1>Register</h1>
         
         <FormError error={errors.firebase} />
         
         <form onSubmit={handleSubmit(onSubmit)}>

            <FromInput type="email" placeholder="ingrese email" {...register("email", 
            {
              required,
              pattern: patternEmail,
            })}>
                  <FormError error={errors.email} />
            </FromInput>          
           
            

            <FromInput type="password" placeholder="ingrese password" {...register("password", {
              minLength: minLength6,
              validate: valifateTrim,
            })}>
                      <FormError error={errors.password} />
            </FromInput>
            
            

            <FromInput type="password" placeholder="ingrese password"  {...register("repassword",{
                validate: validateEquialsPassword(getValues),
            })}>
                    <FormError error={errors.repassword} />
            </FromInput>
            
            
            <button type="submit">registrar</button>
         </form>
    
    </>
  )
}

export default Register