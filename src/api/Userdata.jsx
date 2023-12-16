import axios from "axios";

export async function getMyArticle(token){
    
    try {
        const {data} = await axios.get(`http://158.220.119.186:8050/appsapps/article/token/${token}/`) 
        return data
    } catch (error) {
        console.log(error);
    }
}
export async function editMyArticle(id,body){
    try {
        const {data} = await axios.patch(`http://158.220.119.186:8050/appsapps/article/article/${id}/`,body,{headers:{
            Authorization:`Bearer ${localStorage.getItem("access")}`
        }})
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function deleteArticles(id){
    try {
        const {data} = await axios.delete(`http://158.220.119.186:8050/appsapps/article/article/${id}/`,{headers:{
            Authorization:`Bearer ${localStorage.getItem("access")}`
        }})
        return data
    } catch (error) {
        console.log(error);
    }
}


export async function getMyVacancy(token){
    try {
        const {data} = await axios.get(`http://158.220.119.186:8050/appsapps/vacancy/token/${token}/`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function editMyVacancy(id,body){
    try {
        const {data} = await axios.patch(`http://158.220.119.186:8050/appsapps/vacancy/vacancy/${id}/`,body,{headers:{
            Authorization:`Bearer ${localStorage.getItem("access")}`
        }})
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function deleteVacancies(id){
    try {
        const {data} = await axios.delete(`http://158.220.119.186:8050/appsapps/vacancy/vacancy/${id}/`,{headers:{
            Authorization:`Bearer ${localStorage.getItem("access")}`
        }})
        return data
    } catch (error) {
        console.log(error);
    }
}