export const SideBar=()=>{
    return (
        <div className="bg-slate-700 h-dvh w-60">
          <div ><h1 className="flex pl-4 bg-gray-100">Dashboard</h1></div>
          <div><button className="flex bg-gray-900 p-2 m-1 w-40 rounded-full"> <h3 className="text-slate-200">Home</h3></button></div>
          <div><button className="flex bg-gray-900 p-2 m-1 w-40 rounded-full"> <h3 className="text-slate-200">Videos</h3></button></div>
          <div><button className="flex bg-gray-900 p-2 m-1 w-40 rounded-full"> <h3 className="text-slate-200">Post+</h3></button></div>
          <div><button className="flex bg-gray-900 p-2 m-1 w-40 rounded-full"> <h3 className="text-slate-200">Acount</h3></button></div>
        </div>
    )
} 