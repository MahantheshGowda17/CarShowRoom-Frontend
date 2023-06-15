import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





export default function Cards({props}) {

  
  const [success, setSuccess] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('')
  const [severity, setSeverity] = React.useState('')
  console.log(props);
  const handleAddToCart = async() => {
    axios({
      method:'post',
      url: 'http://localhost:8080/api/bookings/add',
      data: {
        model: props?.model,
        name: props?.name,
        description: props?.description,
        price: props?.price,
        imageUrl: props?.imageUrl,
        username: localStorage.getItem('username'),
      }
    })
    .then(res => {
      console.log(res);
      setSuccess(true);
      setSuccessMsg('Added to cart successfully')
      setSeverity('success')
    
    })
    .catch(err => {
      console.log(err);
      setSuccess(true);
      setSuccessMsg('Something went wrong')
      setSeverity('error')
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props?.name}
        subheader={props?.model}
      />
      <CardMedia
        component="img"
        height="194"
        image={props?.imageUrl}
      />

      <CardContent>
        <Typography variant="h5" color="text.secondary">{"₹"+props?.price}</Typography>
        <br/>
        <Typography variant="body2" color="text.secondary">
          {props?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <Button variant="outlined" color="primary" onClick={handleAddToCart}>
                Buy Now
            </Button>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
    </>
  );
}