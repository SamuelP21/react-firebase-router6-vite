import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createContext, useEffect, useState } from "react"
import {auth} from '../firebase'

 
export const UserContext = createContext ()

const UserProvider = (props) => { /* el user provider seria con el que envolvemos para encerrar y asi puedan usar el UserProvider */

    const [user, setUser] = useState(false);

    useEffect(() => {
      const unsuscribe =  onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (user) {
          const {email, photoURL, displayName, uid} = user;
          setUser({email, photoURL, displayName, uid});
        }
        else{
          setUser(null);
        }
        
      })
      return () => unsuscribe();
    },[]);

    const registerUser = (email, pass) => {
     return createUserWithEmailAndPassword(auth, email, pass);
    }

    const loginUser = (email, pass) => {
      return signInWithEmailAndPassword(auth, email, pass);
    }

    const singOutUser = () => {
      //  console.log("hola")
      return signOut(auth);
    }

  return (
    <UserContext.Provider value={{user, setUser, registerUser, loginUser, singOutUser}}> {/* esto nos permite que los componentes salgan a otros componentes  */}
        {props.children} {/* esto es como en el main.jsx que encerramos a app para que las rutas funcionen es el mismo concepto */}
    </UserContext.Provider>
  )
}

export default UserProvider