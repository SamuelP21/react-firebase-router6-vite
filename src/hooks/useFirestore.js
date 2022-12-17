import { useEffect, useState } from "react"
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";


export const useFirestore = () => {
    
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("getData")
        getData()
    },[])// hacemos el useEffect para que se ejecute una vez utilizado el useFirestore

    const getData = async() =>{//como se va a demorar es un promesa
        try {
            setLoading(true);
            const dataRef = collection(db, "urls");
            const q = query(dataRef, where("uid", "==", "AHBjGe1tUMOkOTjRNZHPNa7pKk92"))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => doc.data()) 
            setData(dataDB);
           // querySnapshot.docs.map(doc => ({id:id,...doc.data()})) // ver en https://www.udemy.com/course/curso-react-js/learn/lecture/32852424#content 1 hora clase 179, esto se hace cuando el id no lo tenemos dentro de la coleccion

        } catch (error) {
            console.log(error);
            setError(error.message);
        }finally{
            setLoading(false);
        }
    } 
        

    return {data, error, loading}
}
