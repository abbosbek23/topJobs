import axios from "axios";

export async function postResume(body){
   try {
      const {data} = await axios.post("http://158.220.119.186:8050/appsapps/resume/resumes/",body,{headers:{
        Authorization:`Bearer ${localStorage.getItem("access")}`
      }})
      return data
   } catch (error) {
     console.log(error);
   }
}

export async function getdetails(id){
  try {
    const {data} = await axios.get(`http://158.220.119.186:8050/appsapps/resume/view_id/${id}/`)
    return data;
  } catch (error) {
     console.log(error)    
  }
}