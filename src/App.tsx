import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import MyRooms from './pages/MyRooms';
import User from './pages/User';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Container>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute element={<Layout />} />}>
            <Route path="/" element={<Home />} />
            <Route path="/meeting-room" element={<MeetingRoom />} />
            <Route path="/user" element={<User />} />
            <Route path="/my-rooms" element={<MyRooms />} />
          </Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
