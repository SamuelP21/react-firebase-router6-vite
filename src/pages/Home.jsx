import { useEffect, useState } from "react"
import Title from "../components/Title"
import { useFirestore } from "../hooks/useFirestore"
import Button from "../components/Button"
import { nanoid } from "nanoid"


const Home = () => {

  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()

  const [text, setText] = useState('');
  const [newOriginID, setNewOriginID] = useState();

  //console.log(data)

  useEffect(() => {
    console.log("getData")
    getData()
},[])

  if(loading.getData) return <h1>loading data getData...</h1>
  if(error) return <h1>{error}</h1>

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(text);
    if (newOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID('');
      setText('')
      return
    }

    await addData(text); // hacemos este metodo async await para que se limpie los campos una vez se guarde y se ejecute el addData
    setText("");
  }

  const handleClickDelete = async(nanoid) => {
      await deleteData(nanoid);
  }
  const handleClickEdit = (item) => {
    //console.log("click edit")
    setText(item.origin);
    setNewOriginID(item.nanoid)
  }

  return (
    <div>
      <Title title="Home"/>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="ex: http://example.com" value={text} onChange={e => setText(e.target.value)} />
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
          <div key={item.nanoid}>
            <p>{item.nanoid}</p>
            <p>{item.origin}</p>
            <p>{item.uid}</p>
            <Button text="Delete" type="button" color="red" loading={loading.updateData} onClick={() => handleClickDelete(item.nanoid)} />
            <Button text="edit" type="button" color="blue" onClick={() => handleClickEdit(item)} />
          </div>
        ))
      }
      
    </div>
  )
}

export default Home