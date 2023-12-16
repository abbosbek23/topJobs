import axios from "axios";


export async function AddUser(body) {
    try {
        const {data} = await axios.post("http://158.220.119.186:8050/appsToken/register/",body)
        return {data,success:true}
    } catch (error) {
         const errormessage = error.response.data.email[0]
         return {errormessage,success:false}
    }
   
}
export async function checkEmail(body){
    try {
        const { data } = await axios.post("http://158.220.119.186:8050/appsToken/login/6_number/", body);
       
        return data
    } catch (error) {
        console.log(error);
    
    }
} 

export async function checkUserLogin(userdata){
    try {
        const data = await axios.post("http://158.220.119.186:8050/appsToken/login",userdata)
        return data
    } catch (error) {
        console.log(error);
    }
}
export async function fetchUser(){
    const {data} = await axios.get(`http://158.220.119.186:8050/appsToken/my-profile/${localStorage.getItem("access")}`)
    console.log(data);
}

// export async function checkUserGoogledata(Token){
//     try {
//         const data = await axios.post("http://158.220.119.186:8050/google/google/",Token)
//         console.log(localStorage.getItem("access"));
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }