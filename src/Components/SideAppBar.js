import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses  } from 'react-pro-sidebar';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InputAdornment from '@mui/material/InputAdornment';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import BloodtypeTwoToneIcon from '@mui/icons-material/BloodtypeTwoTone';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RemoveIcon from '@mui/icons-material/Remove';
import BalanceIcon from '@mui/icons-material/Balance';
import CloseIcon from '@mui/icons-material/Close';

const SideAppbar = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }
  return ( 
    <> 
  
    <Sidebar
    transitionDuration={800}
    collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: '#ffffff',
          height: '100vh',
          color: '#000000',
          fontWeight:'Bold',
        },
      }}
    >
    <Box sx={{
      backgroundColor: '#ffffff',
      padding:2,
    }}>
      <Button sx={{ fontSize: 18, padding: 0, color: '#000000', fontWeight:'Bold', width:'100%', }} startIcon={collapsed ? <AccountBalanceIcon size={40} /> : <AccountBalanceIcon size={40}  />} onClick={() => setCollapsed(!collapsed)}> <b style={{ color:'black'}}>{collapsed ? null : 'Bank '}</b></Button>
    </Box>
    <Divider />
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            color: '#000000',
            fontWeight:'Bold',
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#d2d2d2',
              borderTopRightRadius: '25px',
              borderBottomRightRadius: '25px',
                          
            },
            [`&.active`]: {
              backgroundColor: '#ffffff',
              color: '#ffffff',
            },
          },
        }}
      >
        <MenuItem icon={<DashboardIcon />} component={<Link to="/UserDashboard" />} label="New Account">New Account</MenuItem>
        <MenuItem icon={<AddIcon />} component={<Link to="/Deposit" />} label="Deposit">Deposit</MenuItem>
        <MenuItem icon={<RemoveIcon />} component={<Link to="/Withdraw" />} label="Withdraw">Withdraw</MenuItem>
        <MenuItem icon={<BalanceIcon />} component={<Link to="/Balance" />} label="Balance">Balance</MenuItem>
        <MenuItem icon={<CloseIcon />} component={<Link to="/Close" />} label="Close Account">Close Account</MenuItem>
        <MenuItem icon={<SettingsIcon />} component={<Link to="/Modify" />} label="Modify">Modify</MenuItem>
      </Menu>
      <Divider />
      <Box sx={{
        backgroundColor: '#ffffff',
        padding:2,
        bottom: 0,
        position:'absolute',
      }}>
      <Button onClick={handleLogout} sx={{ fontSize: 18, padding: 0, color: '#000000', fontWeight:'Bold', width:'100%' }} startIcon={collapsed ? <LogoutIcon size={40} /> : <LogoutIcon size={40}  />} > {collapsed ? null : 'Logout'}</Button>
    </Box>
    </Sidebar>
    </>
  )
}

export default SideAppbar