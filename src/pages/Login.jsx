import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FromInput from "../components/FromInput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";


const Login = () => {

  const {loginUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();
  const {register, handleSubmit, formState: { errors }, setError} = useForm(); 

  const {required, patternEmail, minLength6, valifateTrim} = formValidate()


  const onSubmit = async(data) => {
    try {
        setLoading(true);
        await loginUser(data.email, data.password);
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
    <div>
      <Title title="Login" />

      <form onSubmit={handleSubmit(onSubmit)}>
      <FromInput type="email" placeholder="ingrese email" {...register("email", 
            {
              required,
              pattern: patternEmail,
            })}
            label="Ingresa Correo"
            error={errors.email}>
                  <FormError error={errors.email} />
            </FromInput>  

            <FromInput type="password" placeholder="ingrese password" {...register("password", {
              minLength: minLength6,
              validate: valifateTrim,
            })}
            label="Contraseña"
            error={errors.password}>
                      <FormError error={errors.password} />
            </FromInput>
            {
              loading ? 
                <ButtonLoading />
              :
                <Button text="Login" type="submit" />

            }
            
      </form>
     
    </div>
  )
}

export default Login