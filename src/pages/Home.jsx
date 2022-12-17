import Title from "../components/Title"
import { useFirestore } from "../hooks/useFirestore"


const Home = () => {

  const {data, error, loading} = useFirestore()

  console.log(data)

  if(loading) return <h1>loading data...</h1>
  if(error) return <h1>{error}</h1>

  return (
    <div>
      <Title title="Home"/>
      {
        data.map(item => (
          <div key={item.nanoid}>
            <p>{item.nanoid}</p>
            <p>{item.origin}</p>
            <p>{item.uid}</p>
          </div>
        ))
      }
      
    </div>
  )
}

export default Home