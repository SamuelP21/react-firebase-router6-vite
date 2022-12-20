import { useEffect, useState } from "react"
import { db, auth } from "../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { nanoid } from "nanoid";


export const useFirestore = () => {
    
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});

   /* useEffect(() => {
        //console.log("getData")
        getData()
    },[])*/// hacemos el useEffect para que se ejecute una vez utilizado el useFirestore

    const getData = async() =>{//como se va a demorar es un promesa
        try {
            setLoading(prev => ({...prev, getData: true}));
            const dataRef = collection(db, "urls");
            const q = query(dataRef, where("uid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => doc.data()) 
            setData(dataDB);
           // querySnapshot.docs.map(doc => ({id:id,...doc.data()})) // ver en https://www.udemy.com/course/curso-react-js/learn/lecture/32852424#content 1 hora clase 179, esto se hace cuando el id no lo tenemos dentro de la coleccion

        } catch (error) {
            console.log(error);
            setError(error.message);
        }finally{
            setLoading(prev => ({...prev, getData: false}));
        }
    } 

    const addData = async(url) =>{
        try {
            setLoading(prev => ({...prev, addData: true}));
            const newDoc = {
                enabled: true,
                nanoid: nanoid(6),
                origin: url,
                uid: auth.currentUser.uid, // id del usuario
            }//este es el documento que se mandara a firestore
            const docRef = doc(db, "urls", newDoc.nanoid) // con el newDoc.nanoid le decimos el id que tomatara ese documento
            await setDoc(docRef, newDoc); // enviamos los datos del documento
            setData([...data, newDoc])
        } catch (error) {
            console.log(error);
            setError(error.message);
        }finally{
            setLoading(prev => ({...prev, addData: false}));
        }
    }

    const deleteData = async(nanoid) => { // https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=es&authuser=3
        try {
            setLoading(prev => ({...prev, [nanoid]: true}));// lo mandamos entre [] por si tiene caracteres extraños y es para colocar al accion en el button indicado
            const docRef = doc(db, "urls", nanoid);
            await deleteDoc(docRef);
            setData(data.filter(item => item.nanoid !== nanoid))
        } catch (error) {
            console.log(error);
            setError(error.message);
        }finally{
            setLoading(prev => ({...prev, [nanoid]: false}));
        }
    }

    const updateData = async(nanoid, newOrigin) => { // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es&authuser=3
        try {
            setLoading(prev => ({...prev, updateData: true}));
            const docRef = doc(db, "urls", nanoid);
            await updateDoc(docRef, {
                origin: newOrigin,
            });
            setData(
                data.map((item) => 
                    item.nanoid === nanoid ? {...item, origin: newOrigin} : item
                )
            );
        } catch (error) {
            console.log(error);
            setError(error.message);
        }finally{
            setLoading(prev => ({...prev, updateData: false}));
        }
    }

    const searchData = async(nanoid) =>{
        try {
            
            const docRef = doc(db, "urls", nanoid);
            const docSnap = await getDoc(docRef);

            return docSnap;
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }
        

    return {data, error, loading, getData, addData, deleteData, updateData, searchData}
}
