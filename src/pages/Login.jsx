import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FromInput from "../components/FromInput";
import { formValidate } from "../utils/formValidate";


const Login = () => {

  const {loginUser} = useContext(UserContext);
  const navegate = useNavigate();
  const {register, handleSubmit, formState: { errors }, setError} = useForm(); 

  const {required, patternEmail, minLength6, valifateTrim} = formValidate()


  const onSubmit = async(data) => {
    try {
        await loginUser(data.email, data.password);
        navegate('/');
    } catch (error) {
        console.log(error.code);
        setError("firebase", {
            message: erroresFirebase(error.code),
        });
        
  
    }
  };

  return (
    <div>
      <h1>Login</h1>
      
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
            <button type="submit">Login</button>
      </form>
     
    </div>
  )
}

export default Login