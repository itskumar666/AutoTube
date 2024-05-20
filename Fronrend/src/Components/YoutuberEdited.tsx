import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define a type for the video data
interface Video {
  id: number;
  title: string;
  description: string;
  fileName:string
  // Add other relevant fields based on your data
}

export const EditorUnedited: React.FC = () => {
  const [vid, setVid] = useState<Video[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/Videos/YoutuberEdited");
        setVid(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);
  const download=async(id:any,fileName:string)=>{
    try {
        const res = await axios.get(`http://localhost:8080/Videos/YoutuberEdited?id=${id}`,{responseType:'blob'});

        const url=URL.createObjectURL(new Blob([res.data]))
        const link=document.createElement('a')
        link.href=url
        link.setAttribute('download', `${fileName}`); 
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
      
  }
// implement delete feature
  return (
    <div>
      {vid ? (
        vid.map((v) => (
          <div key={v.id}>
            <h2>{v.title}</h2>
            <p>{v.description}</p>
            <button onClick={()=>download(v.id,v.fileName)}>Download Video</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
