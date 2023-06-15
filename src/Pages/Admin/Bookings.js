import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography'
import axios  from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Bookings() {

  
  const navigate = useNavigate()
  React.useEffect(() => {
    let user = localStorage.getItem('username')
    if (!user) {
      navigate('/')
    }
  }, []);
  
const columns = [
  {
    field: 'username',
    headerName: 'User',
    width: 250,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Car',
    width: 150,
    editable: true,
  },
  {
    field: 'model',
    headerName: 'Model',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'number',
    width: 310,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Bills',
    width: 260,
  },
];


  const [rows, setRows] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('')
  const [severity, setSeverity] = React.useState('')

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/bookings')
    .then(res => {
      setRows(res.data)
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);


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
    <Typography variant="h4" color="black">Bookings list:</Typography>
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
    </>
  )
}

export default Bookings