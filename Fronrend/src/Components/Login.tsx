import {z} from 'zod';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const LoginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})
type FormData=z.infer<typeof LoginSchema>
export const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value });
    };
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        try{
            LoginSchema.parse(formData);
            await axios.post('http://localhost:8080/login', formData)

            navigate('./MainPage');
        }catch(error){
            console.log(error,"data not sent");
        }
        // console.log('Form submitted with data:', formData);
    };

  return (
    <form  onSubmit={handleSubmit} className="space-y-4">
          <div>
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input 
              type="text" 
              name="Email" 
              value={formData.email} 
              onChange={handleInputChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
              required 
            />
          </label>
        </div> 
        <div>
          <label className="block">
            <span className="text-gray-700">Password:</span>
            <input 
              type="text" 
              name="name" 
              value={formData.password} 
              onChange={handleInputChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
              required 
            />
          </label>
        </div>
        <button>Login</button>
           </form>
  )
}