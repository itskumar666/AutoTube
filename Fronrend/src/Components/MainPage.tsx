
import { useNavigate } from "react-router-dom";
export function MainPage() {
  const navigate = useNavigate();
  return (
   
      

      <div className="flex flex-row justify-between bg-slate-400">
      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
        <button onClick={()=>{
          navigate('/Videos')
        }}>Videos</button>
      </div>

      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
      <button onClick={()=>{
          navigate('/Upload')
        }}>Upload Videos +</button>
      </div>
      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
      <button onClick={()=>{
          navigate('/Account')
        }}>Account</button>
      </div>

    </div>

   
  );
}
