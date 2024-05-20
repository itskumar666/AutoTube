import axios from 'axios';
import {userState} from '../atom';
import { useRecoilValue ,useRecoilState} from 'recoil';


import { useState,useEffect } from'react';
import { set } from 'zod';

export const Account = () => {
  const [userDetails,setUserDetails]=useRecoilState(userState)

    const user=useRecoilValue(userState)
    const [pass, setPass] = useState<any>('')
    const [confirmPass, setConfirmPass] = useState<any>('')
    const [details, setDetails] = useState<any>({
      name: '',
      email:'',
      editorToken:''
    })
    useEffect(()=>{
      const config={
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
        }
      }
       axios.get('http://localhost:8080/Account',config).then(res=>{
            setDetails(res.data)})
            .catch((err:Error)=>{
                console.log(err,"didnt call")
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
  const generateToken=()=>{
    axios.post('http://localhost:8080/generateToken',{
      email:details.email
    }).then(res=>{
      setDetails(res.data)
      setUserDetails((user)=>user.editorToken=res.data.editorToken)
    
  })}

  

  return (
    <div>
      <div>{details.name}</div>
      <div>{details.email}</div>
      {user.userType==="Youtuber"?<div>Token for your Editor{details.editorToken} <button onClick={generateToken}>Generate new Token</button></div>:<div>your token{userDetails.editorToken}</div>}
      <div>
        <h1>Reset Password</h1>
        <input type="password" placeholder='Password' onChange={passHandler1}/>
        <input type="password" placeholder='Confirm Password' onChange={passHandler2}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}



