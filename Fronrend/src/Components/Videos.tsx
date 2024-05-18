import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoList from "./Video";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  // google authenticat route
  const googleAuthenticate =async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/google', {
          method: 'GET',
          credentials: 'include' // Include credentials for CORS
      });
      const data = await response.json();
      window.location.href = data.authUrl; // Navigate to the Google OAuth URL
  } catch (error) {
      console.error('Error fetching auth URL:', error);
  }
  };

  return (
    <div>
      <div className='flex justify-center'>
      <div className='bg-gray-700 p-2 m-1 rounded-full text-slate-200'>List of Videos</div>

      <button onClick={googleAuthenticate}>Verify Your Youtube Account</button>
      </div>
      <VideoList videos={videos} />
    </div>
  );
}
