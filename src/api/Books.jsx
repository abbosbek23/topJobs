import axios from "axios";

export async function getBook(){
    try {
        
        const data = axios.get("http://158.220.119.186:8050/appsbook/book/")
      
        return data
    } catch (error) {
        console.log(error);
    }
}
export async function getBookdetails(id){
    try {
        const data = axios.get(`http://158.220.119.186:8050/appsbook/book/${id}/`)
        return data
    } catch (error) {
        console.log(error);
    }
}