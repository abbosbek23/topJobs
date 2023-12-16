import Layout from '../../layout/layout'
import { getBook } from '../../api/Books'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import "./index.css"


async function getBooks(){
const {data} =  await getBook()
return data 
}

const Books = () => {

   const {data, isLoading, isError} = useQuery({queryKey:["books"],queryFn:getBooks})

   if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error recieve data</h1>;
  }
  

  return (
    <Layout>
        <div className='container mt-4'>
        <h3>Books</h3>
         <div className="row d-flex flex-wrap gap-3" style={{marginTop:"7%"}}>
            {
                data.map(item=><div key={item.id} className="box-book mt-3">
                    <img src={item.image} width={"160px"} height={"160px"} alt="" />
                <p style={{border:"none", marginTop:"20px",marginBottom:"10px",fontSize:"15px",fontWeight:"600"}}>{item.author}: {" "+item.name}</p>
                <p>Describtion: {item.description}</p>
                <Link to={`/bookdetails/${item.id}`}><button className='btn btn-outline-primary btn-books'>Batafsil</button></Link>
                <a href={item.book} download={data.book}><button className='btn btn-outline-success btn-download-book'>Download</button></a>
                </div>)
            }

</div>
    </div>
    </Layout>
  )
}

export default Books