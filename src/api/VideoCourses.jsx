import axios from "axios";

export async function getVideos() {
    try {
        const {data} = await axios.get("http://158.220.119.186:8050/appsdirect_video/direct_video/")
        return data  
    } catch (error) {
        console.log(error);
    }
}
export async function getVideosdetails(namecategory){
    try {
        const {data} = await axios.get(`http://158.220.119.186:8050/appsdirect_video/direct_video/?category=${namecategory}`)
        return data
    } catch (error) {
        console.log(error);
    }
}