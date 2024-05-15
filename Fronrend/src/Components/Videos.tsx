import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoList from "./Video";

export function Videos() {
  const [videos, setVideos] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/Videos", config)
      .then((response) => {
        setVideos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div>
      <div className='flex justify-center'>
  <div className='bg-gray-700 p-2 m-1 rounded-full text-slate-200'>List of Videos</div>


      </div>
      <VideoList videos={videos} />
    </div>
  );
}
