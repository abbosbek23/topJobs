import axios from "axios";

export async function SavePost(body) {
    try {
        const {data} = await axios.post("http://158.220.119.186:8050/appsapps/article/article/",body,{headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },})
        return data
    } catch (error) {
        console.log(error);
    }
}
export async function Like(id){
    try {
       const data = await axios.post("http://158.220.119.186:8050/appsapps/article/like/",{article:id},{headers:{
        Authorization:`Bearer ${localStorage.getItem("access")}`
       }}) 
       return data
    } catch (error) {
        console.log(error);
    }
}

// export async function CommentView(){
//     try {
//         const {data} = await axios.get("http://158.220.119.186:8050/appsapps/article/comment/1/",{headers:{
//             Authorization:`Bearer ${localStorage.getItem("access")}`
//         }})
//         return data
//     } catch (error) {
//         console.log(error);
//     }
// }
export async function AddComment(body){
    try {
       const {data} = await axios.post("http://158.220.119.186:8050/appsapps/coment-create-article",body,{headers:{
        Authorization:`Bearer ${localStorage.getItem("access")}`
       }})
       return data 
    } catch (error) {
        console.log(error);
    }
}

export async function Comment(id){
    try {
        const {data} = await axios.get(`http://158.220.119.186:8050/appsapps/article/comment/${id}/`)
        return data
    } catch (error) {
        console.log(error);
    }
}