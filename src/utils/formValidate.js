export const formValidate = (getValues) => { 
    return{
        required: {
            value: true,
            message: "Campo obligatorio"
        },
        patternEmail: {
          value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
          message: "Formato de email incorrecto",
        },
        minLength6: {
            value: 6,
            message: "Password minimo de 6 caracteres"
          },
        valifateTrim: {
            trim: (v) => {
                if (!v.trim()) 
                  return  "llene el password";
                return true;
            }  
        },
        validateEquials(value) {
           return{
            equialsValores: v => v === value || "no coninside las contraseña"
           }                 
         },
          
    }
 }