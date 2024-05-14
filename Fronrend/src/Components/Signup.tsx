import axios from 'axios';
import { useState } from 'react';
import {z} from 'zod';
import { useNavigate } from "react-router-dom";



export const Signup = () => {
  const SignupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
  });
  type FormData=z.infer< typeof SignupSchema>;
    const navigate = useNavigate();
  // State variables to store form data
  const [formData, setFormData] =useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle form input changes
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try{
        formData.confirmPassword = formData.password;
        SignupSchema.parse(formData);
       const response=await axios.post('http://localhost:8080/', formData)

       localStorage.setItem('jwtToken', response.data.token);
       
       navigate('./MainPage');
     
        
    }catch(error){
      console.log(error,"data not sent");
    }
    // console.log('Form submitted with data:', formData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">
            <span className="text-gray-700">Name:</span>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
              required 
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input 
              type="email" 
              name="email" 
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
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
              required 
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Confirm Password:</span>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleInputChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
              required 
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Sign Up</button>
      </form>
      <div><button onClick={()=>navigate('./login')}>Login</button></div>
    </div>
  );
};

export default Signup;
