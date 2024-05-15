import axios from 'axios';

import { useState,useEffect } from'react';
export const Account = () => {
    const [pass, setPass] = useState<any>('')
    const [confirmPass, setConfirmPass] = useState<any>('')
    const [details, setDetails] = useState<any>({
      name: '',
      email:''
    })
    useEffect(()=>{
      const config={
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
        }
      }
       axios.get('http://localhost:8080/Account',config).then(res=>{
            setDetails(res.data)})
            .catch((err)=>{
                console.log("didnt call")
            })
    },[])
  
    const passHandler1=(e:any)=>{
        setPass(e.target.value)
    }
    const passHandler2=(e:any)=>{
        setConfirmPass(e.target.value)
    } 
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      prompt("Passwords do not match");
    } else {
      axios
        .post("http://localhost:8080/reset", {
          password: pass,
          email: details.email,
        })
        .then((response) => {
          alert("Password reset successful")
        })
        .catch((err) => {
          alert("Error resetting password")
        });
    }
  }
  

  return (
    <div>
      <div>{details.name}</div>
      <div>{details.email}</div>
      <div>
        <h1>Reset Password</h1>
        <input type="password" placeholder='Password' onChange={passHandler1}/>
        <input type="password" placeholder='Confirm Password' onChange={passHandler2}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}