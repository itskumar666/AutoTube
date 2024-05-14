import { useState } from "react"
import axios from 'axios';
export const Upload=()=>{
    const [file,setFile]=useState<any>()
    const change=(event:any)=>{
        setFile(event.target.files[0])
    }

  const upload = (event: any) => {
    event.preventDefault();
    const url = "http://localhost:8080/upload";
    const data = new FormData();
    if (file) {
      data.append("file", file);
      data.append("name", file.name);
    
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "content-type": "multipart/form-data",
      }
    };
    console.log(file)
    axios
      .post(url, data, config)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });}
      else{
        console.log(file)
        alert("please select a file to upload")
      }
  };
    return(
        <div>
            <input type="file" onClick={change}/>
            <button onClick={upload}>uploads</button>
        </div>
    )
}