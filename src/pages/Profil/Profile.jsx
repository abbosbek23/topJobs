import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import userface from "../../assets/man.png"
import "./index.css"
import Layout from "../../layout/layout"

async function getUserdetails(){
    const data = await axios.get(`http://158.220.119.186:8050/appsToken/my-profile/${localStorage.getItem("access")}/`)
    return data
}

const Profile = () => {

  const {data,isError,isLoading} = useQuery({queryKey:["users"],queryFn:getUserdetails})
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error recieve data</h1>;
  }
  

  return (
      <div>
        <Layout>
        <div className='container'>
        <div className="row mt-5">
        <div className="col-md-8 offset-2 mt-5"> 
        <div className="row mt-3">
        <div className="col-md-6">
    <img src={userface} width={"140px"} height={"140px"} style={{borderRadius:"500px"}} alt="" />
        </div>
        <div className="col-md-4 detailsuser">
            <div>
         FirstName   
    <h4 className='form-control'> {data.data.user_data.username}</h4>
            </div>
         <h4 className='mt-4'>Email</h4>   
    <h4 className='form-control w-100'>{data.data.user_data.email}</h4>   
            </div>
            </div>   
        </div>
        </div>
    </div>
        </Layout>
    </div>
  )
}

export default Profile