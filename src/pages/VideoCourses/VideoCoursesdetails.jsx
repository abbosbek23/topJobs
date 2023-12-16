import ReactPlayer from 'react-player'
import { useState } from 'react'
import { getVideosdetails } from '../../api/VideoCourses'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import Navbar from '../../components/Navbar/navbar';

const getVideodetails  = async (namecategory) => {
    const data = await getVideosdetails(namecategory)
    return data
}

const VideoCoursesdetails = () => {
    const { namecategory } = useParams();
    const [videourl,setvideoUrl] = useState('')
    const { data, isLoading, isError } = useQuery({
        queryKey: ["data"],
        queryFn: () => getVideodetails(namecategory),
      });

      if (isLoading) {
        return <h1>Loading...</h1>;
      }
      if (isError) {
        return <h1>Error recieve data?</h1>;
      }
    
  return (
    <div>
      <Navbar/>
        <div className={'container'}>
        <div className={"row mt-5"} style={{paddingTop:"80px"}}>          
            <div className="col-md-7">
                <ReactPlayer url={videourl === "" ? data[0].link:videourl} controls={true}/>
                        </div>
                        <div className="col-md-4">
                            <div className={"box-videos"}>
                                {data.map((item)=> <div key={item.id} className={"content-url"}>
                                    <button onClick={()=>setvideoUrl(item.link)}>{item.description}</button>
                                 </div>)}
                               
                            
                        </div>
                        </div>
                   
                    </div>
                

        </div>
    </div>
  )
}

export default VideoCoursesdetails