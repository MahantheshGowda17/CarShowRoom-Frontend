import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
    const [username,setUsername] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [usernameError,setUsernameError] = React.useState(false)
    const [passwordError,setPasswordError] = React.useState(false)
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
        return regex.test(password);
      };
    
    const handleLogin = () => {
      let userData = {
        username:username,
        password:password
      }
      axios({
        method:'post',
        url: 'http://localhost:8080/api/login',
        data: userData
      })
      .then(res => {
        console.log(res);
        if(res.status === 200){
          localStorage.setItem('userID', res.data.userId)
          localStorage.setItem('username', res.data.username)
          navigate('/UserDashboard')
        }
      })
      .catch(err => {
        alert("Invalid Username or Password")
      })
    }
  return (
    <Box
      style={{
        background:`#ffffff`,
        height:'100vh',
        width:'100vw',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
      }}
    >
      <Paper
        style={{
          height:'80vh',
          width:'50vw',
          borderRadius:'20px',
          padding:'50px',
        }}
        elevation={3}
        >
          <Typography variant="h5" sx={{textAlign:'center'}}><b>Car Showroom Management System</b></Typography>
            <Typography variant="body1" sx={{textAlign:'left', mt:'20px', ml:'0px'}}>User Login:</Typography>
            <TextField
              id="username"
              label="Username"
              helperText={username.length===0 ? 'Enter valid username' : ''}
              value={username}
              error={usernameError}
              required
              onChange={(e)=>setUsername(e.target.value)}
              sx={{
                mt:2,
                width:'100%',
                borderRadius:5
              }}
            />
            <TextField
              id="password"
              label="Password"
              helperText={password.length===0 ? 'Password is required' :  validatePassword(password) ? '' : 'Password must contain atleast one uppercase,lowercase,number and special character '}
              value={password}
              error={!validatePassword(password)}
              required
              onChange={(e)=>setPassword(e.target.value)}
              sx={{
                mt:1,
                width:'100%',
                borderRadius:5
              }}
            />
            <Button sx={{
                width:'100%',
                mt:2,
                height:'55px',
                borderRadius:'10px',
              }} 
              onClick={handleLogin}
              variant="contained">
              Login
            </Button>
            <Typography variant="subtitle2" sx={{textAlign:'center', mt:'10px', ml:'0px', color:'black'}} >Don't have an account? <a href="/Signup" style={{textDecoration:'none', color:'blue'}}>Signup</a></Typography>
      </Paper>
    </Box>
  )
}

export default Login