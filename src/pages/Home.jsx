import { useEffect, useState } from "react"
import Title from "../components/Title"
import { useFirestore } from "../hooks/useFirestore"
import Button from "../components/Button"
import { formValidate } from "../utils/formValidate"
import { useForm } from "react-hook-form"
import FromInput from "../components/FromInput"
import FormError from "../components/FormError"
import { erroresFirebase } from "../utils/erroresFirebase"


const Home = () => {

  const [copy, setCopy] = useState({})

  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()

  //const [text, setText] = useState('');
  const [newOriginID, setNewOriginID] = useState();

  const {required, patternURL} = formValidate()
  const {register, handleSubmit, formState: { errors }, setError, resetField, setValue} = useForm(); 

  //console.log(data)

  useEffect(() => {
    console.log("getData")
    getData()
},[])

  if(loading.getData) return <h1>loading data getData...</h1>
  if(error) return <h1>{error}</h1>

  const onSubmit = async({url}) => {    
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID('');
      }else {
        await addData(url); // hacemos este metodo async await para que se limpie los campos una vez se guarde y se ejecute el addData
      }
      resetField('url')

    } catch (error) {
        const {code, message} = erroresFirebase(error.code);
        setError(code, { message });  
    }
 
  }

  const handleClickDelete = async(nanoid) => {
      await deleteData(nanoid);
  }
  const handleClickEdit = (item) => {
    //console.log("click edit")
    //setText(item.origin);
    setValue('url', item.origin);
    setNewOriginID(item.nanoid)
  }

  /** */
  const pahtURL = window.location.href;

  const handleClickCopy = async(nanoid) =>{

    await navigator.clipboard.writeText(window.location.href+nanoid)
    setCopy({[nanoid]: true});
  }
  /** */

  return (
    <div>
      <Title title="Home"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <FromInput type="text" placeholder="ex: http://example.com" {...register("url", 
            {
              required,
              pattern: patternURL,
            })}
            label="Ingresa URL"
            error={errors.url}>
                  <FormError error={errors.url} />
            </FromInput>
        {
          newOriginID ? (
            <Button text="Edit url" type="submit" color="blue" loading={loading.updateData} />
          ):
          (
            <Button text="Add url" type="submit" color="blue" loading={loading.addData} />
          )
        }
        
        
      </form>
      {
        data.map(item => (
          <div key={item.nanoid} className=" mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pahtURL}{item.nanoid}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>
            
            <div className="flex space-x-2">
              <Button text="Delete" type="button" color="red" loading={loading[item.nanoid]}  onClick={() => handleClickDelete(item.nanoid)} />
              <Button text="Edit" type="button" color="yellow" onClick={() => handleClickEdit(item)} />
              <Button text={copy[item.nanoid] ? 'Copied' : 'Copy'} type="button" color="blue" onClick={() => handleClickCopy(item.nanoid)} />
            </div>
          </div>
        ))
      }
      
    </div>
  )
}

export default Home