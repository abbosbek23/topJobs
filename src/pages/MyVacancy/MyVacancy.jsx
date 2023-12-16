import { getMyVacancy, deleteVacancies } from "../../api/Userdata";
import {  useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import Navbar from './../../components/Navbar/navbar';
import EditVacancy from "../../components/EditmyVacancy/EditmyVacancy";

import axios from "axios";
import { toast } from "react-toastify";



async function getVacancy(token){
  const data = await getMyVacancy(token)
  return data
}

const MyVacancy = () => {
  const getVacancies = async(token)=>{
    const data = await getMyVacancy(token)
    return data
  } 
  const [Modalvisible, setModalvisible] = useState(false);
  const token = localStorage.getItem("access")  
  const {data,isError,isLoading} = useQuery({queryKey:['myvacancy'],queryFn:()=>getVacancy(token)})
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
      getVacancies(token)
      queryClient.refetchQueries(["myvacancy"])
      toast.success("Your Vacancy edit successfully")
      
    }else{
      axios.get(`http://158.220.119.186:8050/appsapps/vacancy/view_id/${id}/`).then((res)=>{
        setItemId(res.data)
      })
      setItemId(data)
    }
    if(Modalvisible === false){
      alert
    }else{
      getVacancies(token)
    }
    setModalvisible(p=>!p)
  }

  const deleteVacancy = async(id)=>{
   const data = await deleteVacancies(id)
   queryClient.refetchQueries(["myvacancy"])
   toast.success("Your Vacancy deleted successfully")
  }

  return (
    <div>
        <Navbar/>
        <div className="container" style={{paddingTop:"100px"}}>
        <h1>My Vacancy</h1>
        <hr />
        {data.user_data.Vacancy_access === true  ?  <div className="d-flex">{data.user_data.vacancy.map((item)=> <div className={"card me-3"} style={{width:"18rem"}} key={item.id}>
        <div className={"card-body"}>
        <h5 className={"card-title"}>Company:{item.company}</h5>
        <p className={"card-text"}>Job:{item.job}</p>
        <p className={"card-text"}>Address:{item.address}</p>
        <p className={"card-text"}>Conditions:{item.conditions}</p>
        <p className={"card-text"}>Experience:{item.experience}</p>
        <p className={"card-text"}>Requirements:{item.requirements}</p>
        <p className={"card-text"}>Phone Number:{item.phone_number}</p>
        <p className={"card-text"}>Salary:{item.salary}</p>
        <p className={"card-text"}>Working Time:{item.working_time}</p>
        <p className={"card-text"}>Telegram:{item.tg_link}</p>
        <button className="btn btn-warning text-white m-1" onClick={()=>toggle(item.id)}>Edit</button>
        <button className="btn btn-danger m-1" onClick={()=>deleteVacancy(item.id)}>Delete</button>
       </div>
      </div>)}</div> :<h2>No Vacancy</h2>}
         
      
      </div>
       <EditVacancy currentItem={itemId} isOpen={Modalvisible} toggle={toggle}/>
    </div>
  )
}

export default MyVacancy