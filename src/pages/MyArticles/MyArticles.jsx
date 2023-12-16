import { deleteArticles, getMyArticle } from "../../api/Userdata"
import {  useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import Navbar from './../../components/Navbar/navbar';
import EditArticles from "../../components/EditmyArticles/EditArticle";

import axios from "axios";
import { toast } from "react-toastify";



async function getArticle(token){
  const data = await getMyArticle(token)
  return data
}


const MyArticles = () => {
  const getArticles = async(token)=>{
    const data = await getMyArticle(token)
    return data
  } 

  const [Modalvisible, setModalvisible] = useState(false);
  const token = localStorage.getItem("access")  
  const {data,isError,isLoading} = useQuery({queryKey:['myarticles'],queryFn:()=>getArticle(token)})
  const [itemId,setItemId] = useState({})
  const queryClient = useQueryClient()

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error recieve data</h1>;
  }

   function toggle(id) {
    if (id=== false) {
     
      getArticles(token)
      queryClient.refetchQueries(["myarticles"])
      toast.success("Your Article edit successfully")
      
    }else{
      axios.get(`http://158.220.119.186:8050/appsapps/article/view_id/${id}/`).then((res)=>{
        setItemId(res.data)
      })
      setItemId(data)
    }
    if(Modalvisible === false){
      alert("")
    }else{
      getArticles(token)
    }
    setModalvisible(p=>!p)
  }

  const deleteArticle = async(id)=>{
   const data = await deleteArticles(id)
   queryClient.refetchQueries(["myarticles"])
   toast.success("Your Article deleted successfully")
  }

  return (
    <div>
        <Navbar/>
        <div className="container" style={{paddingTop:"100px"}}>
        <h1>My Articles</h1>
        <hr />
        {data.user_data.Articles_access === true  ?  <div className="d-flex">{data.user_data.articles.map((item)=> <div className={"card me-3"} style={{width:"18rem"}} key={item.id}>
        <img src={item.image} width={"250px"} height={"250px"} className={"card-img-top"} alt="title"/>
        <div className={"card-body"}>
        <h5 className={"card-title"}>Title:{item.title}</h5>
        <p className={"card-text"}>Description:{item.description}</p>
        <button className="btn btn-warning text-white m-1" onClick={()=>toggle(item.id)}>Edit</button>
        <button className="btn btn-danger m-1" onClick={()=>deleteArticle(item.id)}>Delete</button>
       </div>
      </div>)}</div>:<h2>No Articles</h2>}
         
      
      </div>
       <EditArticles currentItem={itemId} isOpen={Modalvisible} toggle={toggle}/>
    </div>
  )
}

export default MyArticles