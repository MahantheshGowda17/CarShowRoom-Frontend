import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import SideAppbar from './Components/SideAppBar';
import UserDashboard from './Pages/User/UserDashboard';
import PrimarySearchAppBar from './Components/PrimarySearchAppBar';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Bookings from './Pages/Admin/Bookings';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/UserDashboard" element={
          <>
            <PrimarySearchAppBar />
            <UserDashboard />
          </>
        } />
        <Route path="/AdminDashboard" element={
          <>
            <PrimarySearchAppBar />
            <AdminDashboard />
          </>
        } />
        <Route path="/Bookings" element={
          <>
            <PrimarySearchAppBar />
            <Bookings />
          </>
        } />
        
      </Routes>
    </BrowserRouter>
  </>

  );
}

export default App;
