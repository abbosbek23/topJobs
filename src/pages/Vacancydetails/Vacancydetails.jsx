import { useParams, useNavigate } from "react-router-dom";
import { vacancyDetails } from "../../api/Vacancy";
import { useQuery } from "@tanstack/react-query";
import "./index.css"
import { useState } from "react";
import ForApplyModals from "../../components/ForApplyModal/ForApplyModal";

const getVacancydetails  = async (id) => {
      const data = await vacancyDetails(id)
      
      return data
}



function Vacancydetails() {
    
    const { id } = useParams();
    const navigate = useNavigate() 
    const [Modalvisible,setModalvisible] = useState(false)
    const { data, isLoading, isError } = useQuery({
      queryKey: ["data"],
      queryFn: () => getVacancydetails(id),
    });
    const email = localStorage.getItem("access");
     
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    if (isError) {
      return <h1>Error recieve data?</h1>;
    }
  
    function checkUser(){
      if(!email){
        navigate(`/login?page=vacancy/${id}`)
      }else{
        setModalvisible((p)=>!p)
      }
    }

  return (
    <div>
    <div className="container" style={{paddingTop:"60px"}}>
     
      <div> <div className="col-8 col-md-8  my-5 vacancydetails">
      <h3 className="vacancydetailsh3">{data?.job}</h3>
      <p className="vacancydetailspp">from {data?.salary}</p>
      <p className="vacancydetailsp">Experience {data?.experience}</p>
      <p className="vacancydetailsp">Job Type: {data?.working_time}</p>
      <p className="vacancydetailsp">Shift and schedule:Monday to Friday</p>
      <button className="applybtn btn" onClick={checkUser}>Apply</button>
     </div>
     <div className="col-8 col-md-8  my-5 vacancydetail" >
      <p>{data?.company}</p>
      <p>Location {data?.address}</p>
      <p>{data?.requirements}</p>
      <p className="vacancydetailsp">Experience {data?.experience}</p>
      <p className="vacancydetailsp">Job Type: Full Time</p>
      <p className="vacancydetailsp">{data?.conditions}</p>
      <p className="vacancydetailsp">Shift and schedule:Monday to Friday</p>
      <p className="vacancydetailsp">Phone Number: {data?.phone_number}</p>
      <p className="vacancydetailsp">telegram: <a href={data?.tg_link}>{data?.tg_link}</a></p>
      <p className="vacancydetailsp">{new Date(data?.created_at).toDateString() }</p>
     </div>
     </div>
    </div>
    <ForApplyModals isOpen={Modalvisible} telegramlink={data.tg_link} phone_number={data.phone_number} toggle={checkUser}/>
    </div>
  )
}

export default Vacancydetails