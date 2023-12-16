import { useQuery } from "@tanstack/react-query"
import { getBookdetails } from "../../api/Books"
import { useParams } from "react-router-dom"
import Layout from "../../layout/layout"
import "./index.css"

async function Bookdetailsget(id){
  const {data} = await getBookdetails(id)
  return data
}

const Bookdetails = () => {

   const {id} = useParams()
   const {data,isError,isLoading} = useQuery({queryKey:"bookdetails",queryFn:()=>Bookdetailsget(id)})

   if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error recieve data</h1>;
  }


  return (
    <Layout>
    <div className={"container"} style={{marginBlock:"8%"}}>
            <div className="box-details-book d-flex offset-1">
                <div className="box-details-img">
                    <div className="box-img">
                        <img src={data.image} width={"200px"} height={"200px"} alt=""/>
                    </div>
                </div>
                <div className="box-details-info">
                <h4 className={"fs-3"}>Author:{data.author}</h4>
                <h4> Book:{data.name}</h4>
                 <span className={"descriptions-main"}>Descriptions</span>
                <p>{data.description}</p>
                <a href={data.book} download={"Yuklab Olish"}><button>Yuklab Olish</button></a>
                </div>
            </div>

        </div>
        </Layout>
  )
}

export default Bookdetails