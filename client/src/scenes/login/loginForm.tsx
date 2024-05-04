import { useLoginMutation } from "@/state/api";
import { Button, Input, Typography } from "@mui/material";
import { useState } from "react"
import { FaEye } from "react-icons/fa";
//import { useNavigate } from "react-router-dom";

const loginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  //const navigate = useNavigate();
  const [login,{ isLoading: isAuthenticating }] = useLoginMutation();
  const [error, setError] = useState('');

  async function logIn(e: any) {
    e.preventDefault();
    try {
      if(!isAuthenticating) login(
        {
          email,
          password
        }
      ).then((res: any) => {
        if(res.data.status === 200) {
          let currentTime = new Date().getTime();
          let updatedTime = new Date(currentTime + 8 * 60 * 60 * 1000);
          document.cookie = "token=" + res.data.message + "; expires=" + updatedTime + "; secure=true;";
          document.cookie = "role=" + res.data.role;
          document.cookie = "name=" + res.data.name;
          //navigate('/', { replace: true });
          location.replace('/'); // instead of navigate to force refresh
        } else {
          setError('Email o Password errati')
        }
      })
    } catch {(error: any) => {
      console.error('[logIn] error ->', error);
    }}  
  }

  return (
    <>
        <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
            <Typography style={{fontSize: 20, color: '#043028', marginBottom: 8}}>Accedi</Typography>

            <Typography style={{fontSize: 14, color: '#043028', fontWeight: 600}}>Email</Typography>
            <Input type="string" style={{backgroundColor: '#fcf7f8',fontSize: 14, color: '#4e8098', marginBottom: 8, border: 'solid 1px grey', borderRadius: 6}} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Typography style={{fontSize: 14, color: '#043028', fontWeight: 600}}>Password</Typography>
            <div style={{display: 'flex', position:'relative'}}>
                <Input type={showPassword ? "string" : "password"} style={{backgroundColor: '#fcf7f8', width: '100%', fontSize: 14, color: '#4e8098', marginBottom: 8, border: 'solid 1px grey', borderRadius: 6}} value={password} onChange={(e) => setPassword(e.target.value)} />
                <FaEye style={{display: 'flex', position:'absolute', right: 8, top: 8}} onClick={() => setShowPassword(!showPassword)}/>
            </div>
            <Typography style={{color: 'red'}}>{error}</Typography>
            <Button style={{fontSize: 18}} onClick={(e) => logIn(e)}>Accedi</Button>
        </div>
    </>
  )
}

export default loginForm