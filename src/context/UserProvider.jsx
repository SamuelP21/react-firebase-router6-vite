import { createContext, useState } from "react"
 
export const UserContext = createContext ()

const UserProvider = (props) => { /* el user provider seria con el que envolvemos para encerrar y asi puedan usar el UserProvider */

    const [user, setUser] = useState(false)

  return (
    <UserContext.Provider value={{user, setUser}}> {/* esto nos permite que los componentes salgan a otros componentes  */}
        {props.children} {/* esto es como en el main.jsx que encerramos a app para que las rutas funcionen es el mismo concepto */}
    </UserContext.Provider>
  )
}

export default UserProvider