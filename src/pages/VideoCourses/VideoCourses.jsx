import { useQuery } from "@tanstack/react-query"
import { getVideos } from "../../api/VideoCourses"
import { Link } from "react-router-dom"
import "./index.css"
import Layout from "../../layout/layout"
import infinity from '../../assets/infinity.png'
import stars from '../../assets/stars.svg'

async function getVideo() {
    const data = await getVideos()
    return data
}

const VideoCourses = () => {

   const {data,isError,isLoading} = useQuery({queryKey:["videos"],queryFn:getVideo})

   if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <h1>Error recieve data</h1>
  }

  return (
    <div>
        <Layout>
        <div className={"position-relative "} style={{paddingTop:"40px"}}>

<div className={" bg-image-videocourses"}>
    <div className="container d-flex" style={{paddingTop:"100px"}}>
 <h3 className={"text-main-videocourses"}>Video Online Courses</h3>
 <div>
   <img src={stars} style={{position:"relative", marginTop:"-100px"}} width={"100%"} height={"527px"} alt="" />
   <img src={infinity} style={{position:"absolute",marginTop:"30px", marginLeft:"-500px"}} width={"515px"} height={"331px"} alt="" />
 </div>
    </div>
</div>
<div className={"container"}>
    
       
       
                <div style={{display:"flex",paddingTop:"70px"}}>       
                {
                    data.map(item => <div className="box"  key={item.id}>
                        <Link to={`/videocoursesdetails/${item.category_name}`} state={item}>
                                <img src={item.image} width={"220px"} height={"150px"} alt=""/>
                                <div className="content-text">
                                    <h5>{item.category_name}</h5>
                                       <p>Bepul</p>
                                </div>
                        </Link>
                            </div>

                    )
                }
                </div>
           

       
    
</div>
</div>
</Layout>
    </div>
  )
}

export default VideoCourses