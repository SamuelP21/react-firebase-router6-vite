import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBLhpChDy_2HByP-P_GNAuyE4Nvy9LYjpQ",
  authDomain: "react-router-2022.firebaseapp.com",
  projectId: "react-router-2022",
  storageBucket: "react-router-2022.appspot.com",
  messagingSenderId: "838513892343",
  appId: "1:838513892343:web:c7ecfa745c669d02dbecf2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // autenticacion, crear, ingresar etc

export { auth };