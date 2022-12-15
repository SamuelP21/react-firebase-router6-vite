import { forwardRef } from "react"


const FromInput = forwardRef(({type, placeholder, onChange, onBlur, name, children}, ref) => { // el forwardRef se usa para recibir referencia del componente padre al hijo,  recibe dos parametros, primero los props y luego la regerencia, no importa el nombre le segundo es una referencia del componente
  return (
   <>
        <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={name} />
        {children}
   </>
  )
})

export default FromInput