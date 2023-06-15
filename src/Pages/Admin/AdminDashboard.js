import React from 'react'
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminDashboard() {
    const navigate = useNavigate()

    React.useEffect(() => {
      let user = localStorage.getItem('username')
      if (!user) {
        navigate('/')
      }
    }, []);
    const [name, setName] = React.useState('');
    const [id, setId] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [modelNumber, setModelNumber] = React.useState(0);
    const [price, setPrice] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');
    const [IsSubmitLoading, setIsSubmitLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('')
    const [severity, setSeverity] = React.useState('')


    const handleDeleteCar = () => {
      axios({
        method:'delete',
        url: `http://localhost:8080/api/delete-car/${modelNumber}`,
      })
      .then(res => {
        setSuccess(true);
        setSuccessMsg('Car Deleted Successfully');
        setSeverity('success');
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }

    const handleAddCar = () => {
      setIsSubmitLoading(true);
      axios({
        method:'post',
        url: 'http://localhost:8080/api/add-car',
        data: {
          id:id,
          name:name,
          description:description,
          model:modelNumber,
          price:price,
          imageUrl:imageURL
        }
      })
      .then(res => {
        console.log(res);
        setIsSubmitLoading(false);
        setSuccess(true);
        setSuccessMsg('Car Added Successfully');
        setSeverity('success');
      })
      .catch(err => {
        console.log(err);
        setIsSubmitLoading(false);
        setSuccess(true);
        setSuccessMsg('Something went Wrong');
        setSeverity('error');
      })
      .finally(()=>{
        setIsSubmitLoading(false);
        setName('');
        setDescription('');
        setModelNumber('');
        setPrice('');
        setImageURL('');
        setId('');

      })
    }

    const handleUpdateCar = () => {
      setIsSubmitLoading(true);
      axios({
        method:'post',
        url: 'http://localhost:8080/api/update-car',
        data: {
          id:id,
          name:name,
          description:description,
          model:modelNumber,
          price:price,
          imageUrl:imageURL
        }
      })
      .then(res => {
        console.log(res);
        setIsSubmitLoading(false);
        setSuccess(true);
        setSuccessMsg('Car Updated Successfully');
        setSeverity('success')
      })
      .catch(err => {
        console.log(err);
        setIsSubmitLoading(false);
        setSuccess(true);
        setSuccessMsg(err.response.data);
        setSeverity('error');
      })
      .finally(()=>{
        setIsSubmitLoading(false);
        setName('');
        setDescription('');
        setModelNumber('');
        setPrice('');
        setImageURL('');
        setId('');
      })
    }

    const fetchDetails = () => {
      console.log(modelNumber);
      axios({
        method: 'get',
        url: `http://localhost:8080/api/cars/${modelNumber}`,
      })
        .then(res => {
          console.log(res);
          setName(res.data.name);
          setDescription(res.data.description);
          setModelNumber(res.data.model);
          setPrice(res.data.price);
          setImageURL(res.data.imageUrl);
        })
        .catch(err => {
          console.log(err);
          setSeverity('error');
          setSuccessMsg('Car Not Found');
          setSuccess(true);
        })
        .finally(()=>{
          setIsSubmitLoading(false);
          setName('');
          setDescription('');
          setModelNumber('');
          setPrice('');
          setImageURL('');
          setId('');
        })
    }
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSuccess(false);
    };

  return (
    <>
    <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      {successMsg}
    </Alert>
  </Snackbar>
    <Box sx={{ 
        p:3,
    }}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4"> Add Cars</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box style={{background: '#ffffff', width:'80%', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', boxSizing:'border-box', borderRadius:'25px' }}>
          <Typography variant="h5" color="default">Enter the Car Details</Typography>
          <TextField
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Enter the Name"
                  required
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  style={{
                    marginTop:'70px',
                    marginLeft:'10px',
                    width:'90%'
                  }}
                /> 
                <TextField
                id="description"
                label="Description"
                multiline
                type="text"
                placeholder="Enter the Description"
                required
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                style={{
                  marginTop:'10px',
                  marginLeft:'10px',
                  width:'90%'
                }}
              /> 
              <TextField
                id="model"
                label="Model Number"
                type="number"
                placeholder="Enter the Model Number"
                required
                value={modelNumber}
                onChange={(e)=>{setModelNumber(e.target.value)}}
                style={{
                  marginTop:'10px',
                  marginLeft:'10px',
                  width:'90%'
                }}
              /> 
              <TextField
              id="Price"
              label="Price"
              type="number"
              placeholder="Enter the Price"
              required
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
              style={{
                marginTop:'10px',
                marginLeft:'10px',
                width:'90%'
              }}
            />
            <TextField
              id="image"
              label="Image URl"
              type="text"
              placeholder="Enter the Image URL"
              required
              value={imageURL}
              onChange={(e)=>{setImageURL(e.target.value)}}
              style={{
                marginTop:'10px',
                marginLeft:'10px',
                width:'90%'
              }}
            />
                {IsSubmitLoading? 
                <Grid sx={{ width: '90%', marginLeft:'10px' }}>
                  <LinearProgress />
                </Grid>
                :
                <Button onClick={handleAddCar}  style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'90%', height:'15%'}} variant="contained" color="primary" >
                    Add Car
                </Button>
                }
        </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h4">Update Cars</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box style={{background: '#ffffff', width:'80%', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', boxSizing:'border-box', borderRadius:'25px' }}>
            <TextField
              id="id"
              label="Car ID"
              type="number"
              value={modelNumber}
              onChange={(e)=>{setModelNumber(e.target.value)}}
              
            />
            <Button onClick={fetchDetails} variant="contained" color="primary" style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'90%', height:'8%'}}>Fetch Details</Button>
          <Typography sx={{mt:5}} variant="h5" color="default">Enter the Car Details to Update</Typography>

          <TextField
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Enter the Name"
                  required
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  style={{
                    marginTop:'10px',
                    marginLeft:'10px',
                    width:'90%'
                  }}
                /> 
                <TextField
                id="description"
                label="Description"
                multiline
                type="text"
                placeholder="Enter the Description"
                required
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                style={{
                  marginTop:'10px',
                  marginLeft:'10px',
                  width:'90%'
                }}
              /> 
              <TextField
              id="Price"
              label="Price"
              type="number"
              placeholder="Enter the Price"
              required
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
              style={{
                marginTop:'10px',
                marginLeft:'10px',
                width:'90%'
              }}
            />
            <TextField
              id="image"
              label="Image URl"
              type="text"
              placeholder="Enter the Image URL"
              required
              value={imageURL}
              onChange={(e)=>{setImageURL(e.target.value)}}
              style={{
                marginTop:'10px',
                marginLeft:'10px',
                width:'90%'
              }}
            />
                {IsSubmitLoading? 
                <Grid sx={{ width: '90%', marginLeft:'10px' }}>
                  <LinearProgress />
                </Grid>
                :
                <Button onClick={handleUpdateCar}  style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'90%', height:'8%'}} variant="contained" color="primary" >
                    Update Car
                </Button>
                }
        </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h4">Delete Cars</Typography>
        </AccordionSummary>
        <TextField
              id="id"
              label="Car ID"
              value={id}
              onChange={(e)=>{setId(e.target.value)}}
              sx={{
                ml:5
              }}
            />
            <Button onClick={handleDeleteCar} variant="contained" color="primary" style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'90%', height:'8%'}}>Fetch Details</Button>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <Button onClick={()=>navigate('/Bookings')} variant="contained" color="primary" style={{marginLeft:'10px', marginTop:'20px', borderRadius:'20px', width:'90%', height:'8%'}}>Bookings</Button>
    </Box>
    </>
  )
}

export default AdminDashboard