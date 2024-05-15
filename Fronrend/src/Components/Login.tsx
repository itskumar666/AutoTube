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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      console.log('Input changed:', name, value); 
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          LoginSchema.parse(formData);
         const response= await axios.post('http://localhost:8080/login', formData)
          navigate('/MainPage');
          localStorage.setItem('jwtToken', response.data.token);
      } catch (error) {
        alert("Incorrect email or password")
          console.error(error, "data not sent");
      }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label className="block">
                  <span className="text-gray-700">Email:</span>
                  <input
                      type="text"
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
                      type="password" // Change input type to "password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                  />
              </label>
          </div>
          <button type="submit">Login</button>
      </form>
  );
};
