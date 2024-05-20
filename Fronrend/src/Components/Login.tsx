import {z} from 'zod';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useRecoilState } from "recoil";
import { userState } from '../atom';
const LoginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    userType:z.string().min(1,"User type is required"),
    editorToken:z.string().optional()
})
type FormData=z.infer<typeof LoginSchema>
export const Login = () => {
    const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    userType: "",
    editorToken: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log("Input changed:", name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if(name=="userType"){
      setUser((prevUser) => ({
       ...prevUser,
        userType: value,
      }));
    }
    if(name=="editorToken"){
      setUser((prevUser) => ({
       ...prevUser,
        editorToken: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      LoginSchema.parse(formData);
      console.log(user)
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );
      navigate("/MainPage");
      localStorage.setItem("jwtToken", response.data.token);
    } catch (error) {
      alert("Incorrect email or password");
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
        <label htmlFor="userType">Choose user Type</label>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
        >
          <option value="Youtuber">Youtuber</option>
          <option value="Editor">Editor</option>
        </select>
        {formData.userType === "Editor" ? (
          <input
            name="editorToken"
            type="text"
            placeholder="Enter your token here"
            value={formData.editorToken}
            onChange={handleInputChange}
          />
        ) : null}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
