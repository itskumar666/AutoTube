import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { YoutuberEited } from './YoutuberEdited';

// Define a type for the video data
interface Video {
  id: number;
  title: string;
  description: string;
  fileName:string
  // Add other relevant fields based on your data
}

export const YoutuberUneited: React.FC = () => {
  const [vid, setVid] = useState<Video[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/Videos/YoutuberUnedited");
        setVid(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);
// also implement delete vodeo feature
  return (
    <div>
      {vid ? (
        vid.map((v) => (
          <div key={v.id}>
            <h2>{v.title}</h2>
            <p>{v.description}</p>
            
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
