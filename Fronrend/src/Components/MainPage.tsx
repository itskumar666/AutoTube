
import { useNavigate } from "react-router-dom";
export function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
        
      <div>
        <button onClick={()=>{
          navigate('/Videos')
        }}>Videos</button>
      </div>

      <div>
      <button onClick={()=>{
          navigate('/Upload')
        }}>Upload Videos +</button>
      </div>
      <div>
      <button onClick={()=>{
          navigate('/Account')
        }}>Account</button>
      </div>
    </div>
  );
}
