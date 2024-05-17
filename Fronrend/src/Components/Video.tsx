import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function VideoList({ videos }: { videos: any[] }) {
  
  return (
    <div >
      {videos.map((video, index) => (
        <div className=' flex justify-between border-4 border-sky-100 m-2 ' key={index}>
          <video src={video.url} controls></video>
          <h2>{video.name}</h2>
          <h3>uploaded on : {video.createdAt}</h3>
          
          <h1>Uploaded on youtube {video.published?"yes":"no"}</h1>
          
        </div>
      ))}
    </div>
  );
}

export default VideoList;


  