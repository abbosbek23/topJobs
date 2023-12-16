import { useQuery } from "@tanstack/react-query";
import "./index.css"
import { useNavigate,  Link} from "react-router-dom";
import axios from "axios";
import Layout from "../../layout/layout";

async function fetchResume() {
  const { data } = await axios.get(
    "http://158.220.119.186:8050/appsapps/resume-list/"
  );
 
  return data;
}



const Resume = () => {
    const email = localStorage.getItem("access");
    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery({
      queryKey: ["data"],
      queryFn: fetchResume,
    });

    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    if (isError) {
      return <h1>Error recieve data</h1>;
    }


    function checkUser(){
        if(!email){
          navigate(`/login?page=resumepage`)
        }else{
          navigate("/resume")
        }
      } 

  return (
    <div>
      <Layout>
        <div style={{paddingTop:"80px"}}>
        <div className='resume-bg'>
        <div className='container'>
        
        <h3>Hire the Top of Talent</h3>
        <p>Toptal is an exclusive network of the top freelance software developers, designers, 
            finance experts, product managers, and project managers in the world. 
            Top companies hire Toptal freelancers for their most important projects.
       </p>

       <button className='btn btn-outline-primary btn-main-resume' onClick={checkUser}>Create Resume</button>
       </div>
       </div>
       <div className='container'>
        <h1 style={{paddingTop:"30px",paddingLeft:"10px"}}>Resumes</h1>
        <div className=" box-resumes d-flex" style={{display:"flex"}}>
       {
         data.map(item=><div className="m-2" key={item.id}>
            <div className="box-resume">

         <img src={item.image} width={"223px"} height={"160px"} style={{borderTopRightRadius:"8px",borderTopLeftRadius:"8px"}} alt="" /> 
         <h4 style={{width:"100%"}}>First Name:{" " +item.username}</h4>
         <h4 style={{width:"100%"}}>Last Name:{" " +item.last_name}</h4>
         <p style={{marginBlock:"10px"}}>Job Name:{item.job}</p> 
         <p>Level:{item.level}</p>
         <Link to={`/resumedetails/${item.id}`}><button className=' btn-resume'>See more</button></Link>
            </div>
         </div>)
       }
       </div>
       </div> 
       </div>
       </Layout>
    </div>
  )
}

export default Resume