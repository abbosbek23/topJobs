import axios from "axios"

export async function vacancyDetails(id){
    try {
        const {data} = await axios.get(`http://158.220.119.186:8050/appsapps/vacancy/view_id/${id}/`,{headers:{
            Authorization:`Bearer ${localStorage.getItem("access")}`
        }})
        return data
    } catch (error) {
        console.log(error);
    }
}
export async function SaveVacancy(body) {
    try {
        const {data} = await axios.post("http://158.220.119.186:8050/appsapps/vacancy/vacancy/",body,{headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },})
        return data
    } catch (error) {
        console.log(error);
    }
}