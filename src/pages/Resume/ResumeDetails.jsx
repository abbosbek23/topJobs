import {useParams} from "react-router-dom"
import { getdetails } from "../../api/Resume";
import { useQuery } from "@tanstack/react-query";
import Layout from './../../layout/layout';

async function fetchdetails(id){
  const data = await getdetails(id)
  
  return data 
}


const ResumeDetails = () => {

  const {id} = useParams()
  const {data, isLoading, isError } = useQuery({queryKey:["resumedetails"],queryFn:()=>fetchdetails(id)})
  

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error recieve data</h1>;
  }
   

  return (
      <Layout>
    <div className="container resumerinfo">
    <h1>Resumer Info</h1>
    <hr className="w-75"/>  
    <div className="d-flex justify-content-between w-75">
    <h3 style={{textTransform:"capitalize"}}>{data.job}</h3>
    <h4 style={{textTransform:"capitalize"}}>{data.salary+ "$"}</h4>
    </div>
    <div className="resumeinfo" style={{position:"relative"}}>
    <img src={"http://158.220.119.186:8050"+data.image} width={"200px"} height={"200px"} style={{borderRadius:"100px",position:"absolute",right:"290px"}} alt="" />
    <p><span>Occupation:</span>{data.working_time}</p>
    <p><span>Experience:</span>{data.work_experience_date}</p>
    <p><span>Work Experience direction:</span>{data.work_experience_direction}</p>
    <p style={{textTransform:"capitalize"}}><span>Level:</span>{data.level}</p>
    <p style={{textTransform:"capitalize"}}><span>Skills:</span><span style={{fontWeight:"bold"}}>{data.skills}</span></p>
    <p style={{textTransform:"capitalize"}}><span style={{fontWeight:"bold"}}>Name:</span>{data.username} {" "} </p>
    <p><span style={{fontWeight:"bold"}}>Last Name:</span>{data.last_name}</p>
    <p><span>About me:</span>{data.about_me}</p>
    <p><span>Github Account:</span>{data.github}</p>
    <p><span>Address:</span>{data.address}</p>
    <p><span>Date of birth:</span>{data.date_of_birth}</p>
    <p><span>University or school:</span>{data.school}</p>
    <p><span>Education:</span>{data.education_date}</p>
    <p><span>Education Direction:</span>{data.education_direction}</p>
    </div>
    </div>
     </Layout>
  )
}

export default ResumeDetails