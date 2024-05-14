export const Video=({props:{video}}:any)=>{
    const uploadToYoutube=()=>{
        console.log("Uploading to Youtube")
    }
    return( 
     <div className="flex">
         <div>Video Name{video.name}</div>
         <div>Upload Time{video.time}</div>
         <div>Uploaded{video.isUploaded}</div>
         <div><button onClick={uploadToYoutube}>Upload on Youtube</button></div>

     </div>

   )
}