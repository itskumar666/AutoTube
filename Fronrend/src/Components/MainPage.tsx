
import { useNavigate } from "react-router-dom";
export function MainPage() {
  const navigate = useNavigate();
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
    <div className="flex flex-row justify-between bg-slate-400">
      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
        <button
          onClick={() => {
            navigate("/Videos");
          }}
        >
         Edited Videos
        </button>
      </div>
      
      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
        <button
          onClick={() => {
            navigate("/Unedited");
          }}
        >
         Unedited Videos
        </button>
      </div>

      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
        <button
          onClick={() => {
            navigate("/Upload");
          }}
        >
          Upload Videos +
        </button>
      </div>
      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
        <button
          onClick={() => {
            navigate("/Account");
          }}>
          Account
        </button>
      </div>
      <div className="flex bg-gray-900 p-2 m-1 w-40 rounded-full text-slate-200">
      <button onClick={googleAuthenticate}>Verify Your Youtube Account</button>
      </div>

    </div>
  );
}
