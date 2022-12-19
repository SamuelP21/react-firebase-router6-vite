import { async } from "@firebase/util";
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormError from "../components/FormError";
import FromInput from "../components/FromInput";
import Title from "../components/Title";
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";
import ButtonLoading from "../components/ButtonLoading";


const Register = () => {

    
    
    const {registerUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navegate = useNavigate();
    const {required, patternEmail, minLength6, valifateTrim, validateEquials} = formValidate()

    const {register, handleSubmit, formState: { errors }, getValues, setError} = useForm(); // el getValues ayuda para obtener los datos en el formulario para ver si la contraseña son iguales
                                                                      //setError para manejar los errores

    
    const onSubmit = async(data) => {
      //console.log(data)
      try {
          setLoading(true);
          await registerUser(data.email, data.password);
          navegate('/');
      } catch (error) {
          console.log(error.code);
          const {code, message} = erroresFirebase(error.code);
          setError(code, { message });   
      }finally{
          setLoading(false);
      }
    };



  return (
    <>
        
         <Title title="Register" />
         <form onSubmit={handleSubmit(onSubmit)}>
            <FromInput type="email" placeholder="ingrese email" {...register("email", 
            {
              required,
              pattern: patternEmail,
            })} 
            label="Ingrese su Correo"
            error={errors.email}>
                  <FormError error={errors.email} />
            </FromInput>   

            <FromInput type="password" placeholder="ingrese password" {...register("password", {
              minLength: minLength6,
              validate: valifateTrim,
            })}
            label="Ingrese Contraseña"
            error={errors.password}>
                      <FormError error={errors.password} />
            </FromInput>
            
            

            <FromInput type="password" placeholder="ingrese password"  {...register("repassword",{
                validate: validateEquials(getValues("password")),
            })}
            label="Repita Contraseña"
            error={errors.repassword}>
                    <FormError error={errors.repassword} />
            </FromInput>           
            <Button text="Register" type="submit" loading={loading} />
         </form>
    
    </>
  )
}

export default Register