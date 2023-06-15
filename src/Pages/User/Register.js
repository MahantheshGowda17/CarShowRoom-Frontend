import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Register() {
    const navigate = useNavigate()
    const [username,setUsername] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [confirmPassword,setConfirmPassword] = React.useState('')
    const [usernameError,setUsernameError] = React.useState(false)
    const [passwordError,setPasswordError] = React.useState(false)
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
        return regex.test(password);
      };
      
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [gender, setGender] = React.useState('');

    const handleRegister = () => {
      if (!validatePassword(password)) {
        return
      }
      if (username === '' || name==='') {
        alert('Please fill all the fields')
        return
      }
      let userData = {
        name,
        email,
        phone,
        address,
        gender,
        username,
        password,
      }

      console.log(userData);
      axios.post("http://localhost:8080/api/signup", userData)
      .then(res => {
        console.log(res);
        alert('Registered Successfully')
        if (res.status === 201) {    
          localStorage.setItem('userID', res.data.userId)
          localStorage.setItem('username', res.data.username)
          navigate('/UserDashboard') 
        }
      })
      .catch(err => {
        
        console.log(err);
        if (err.status === 400) {
          alert('Username already exists')
        }
        else{
          alert('Error Occured! Check your console for details') 
        }
      })
    
    }

  return (
    <Container sx={{
        p:5,
        height:'100%'

    }} maxWidth="lg">
      <Paper elevation={10} sx={{
        p:5,
        height:'100%',
        borderRadius:10
      }}>
        <Box sx={{
            textAlign:'center'
        }}>
            <Typography variant="h4" sx={{}}><b>Car Showroom Management System</b></Typography>
            <Typography variant="h6" sx={{textAlign:'left', mt:'20px', ml:'0px'}}>User Registeration:</Typography>
            <TextField
              id="name"
              label="Full Name"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              sx={{
                width:'100%',
                mt:3,
              }}
            />
            <TextField
              id="email"
              label="Email"
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
              sx={{
                width:'100%',
                mt:3,
              }}
            />
            <TextField
              id="phone"
              label="Phone"
              value={phone}
              required
              onChange={(e)=>setPhone(e.target.value)}
              sx={{
                width:'100%',
                mt:3,
              }}
            />
            <TextField
              id="address"
              label="Address"
              required
              placeholder="Enter your address"
              value={address}
              multiline
              onChange={(e)=>setAddress(e.target.value)}
              sx={{
                width:'100%',
                mt:3,
              }}
            />
              <div style={{ display: 'flex', alignItems: 'center', padding:'20px' }}>
                <div style={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender-select"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>          
                </FormControl>
                </div>
              </div>
            
            <TextField
              id="username"
              label="Username"
              helperText={username.length===0 ? 'Enter valid username' : ''}
              value={username}
              error={usernameError}
              required
              onChange={(e)=>setUsername(e.target.value)}
              sx={{
                mt:3,
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
            <TextField
              id="confirm-password"
              label="Confirm Password"
              helperText={confirmPassword!==password ? 'Password does not match' : ''}
              value={confirmPassword}
              error={confirmPassword!==password}
              required
              onChange={(e)=>setConfirmPassword(e.target.value)}
              sx={{
                mt:1,
                width:'100%',
                borderRadius:5
              }}
            />
            <Button 
            onClick={handleRegister}
            sx={{
                width:'100%',
                mt:2,
                height:'55px',
                borderRadius:"10px",
            }} variant="contained">
              Register
            </Button>
            <Typography variant="subtitle1">Already have an account? <a href="/" style={{textDecoration:'none', color:'blue'}}>Login</a></Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Register