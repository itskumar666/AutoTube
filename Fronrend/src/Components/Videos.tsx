import { useEffect,useState } from "react"
import axios from "axios"
import { Video } from "./Video"
export const Videos=()=>{
    const [videos,setVideos]=useState([])
    //axios request from server of all videos list
    useEffect(()=>{
        //db call from server
        const dbcall=async()=>{
        const response=await axios.get("http://localhost:8000/videos")
        setVideos(response.data)
    }
    dbcall()
        
    },[])
    return(
        <div>
            {
                videos.map((video)=>{
                  return <Video video={video}></Video>
                })
            }
        </div>
    
    )}