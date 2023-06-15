import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Cards from './../../Components/Cards';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {

  
  const navigate = useNavigate()
  React.useEffect(() => {
    let user = localStorage.getItem('username')
    if (!user) {
      navigate('/')
    }
  }, []);


  const [carsList, setCarsList] = React.useState([]);
  React.useEffect(() => {
    axios({
      method:'get',
      url: 'http://localhost:8080/api/getcars',
    })
    .then((response) => {
      setCarsList(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);



  

  return (
    <Container maxWidth="lg">
      <Box>
        <Grid container spacing={2} sx={{marginTop: '20px'}}>
            {carsList.map((car) => (     
              <Grid item xs={12} sm={6} md={4} lg={3} key={car.carId}>
                <Cards props={car} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default UserDashboard