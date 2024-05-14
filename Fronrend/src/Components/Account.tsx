import axios from 'axios';
import{z} from 'zod';
import { useState } from'react';
export const Account = () => {
    const [pass, setPass] = useState<any>('')
    const [confirmPass, setConfirmPass] = useState<any>('')
    const passSchema=z.object({
        password:z.string().min(6),
        confirmPassword:z.string().min(6)
    })
    
        
 const passHandler1=(e:any)=>{
        setPass(e.target.value)
    }
    const passHandler2=(e:any)=>{
        setConfirmPass(e.target.value)
    }
    const handleSubmit=(e:any)=>{
        e.preventDefault()
        passSchema.parse({password:pass})
        if(pass!==confirmPass){
            prompt("Passwords do not match")
        }
        else{
            axios.post('http://localhost:8080/api/v1/auth/reset',{password:pass}).then(res=>{
                prompt("Password reset successfully")
            })
        }
       
       
    }

  return (
    <div>
      <div>Name</div>
      <div>Password</div>
      <div>
        <h1>Reset Password</h1>
        <input type="password" placeholder='Password' onChange={passHandler1}/>
        <input type="password" placeholder='Confirm Password' onChange={passHandler2}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}