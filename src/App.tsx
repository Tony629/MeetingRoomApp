import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import BookRoom from './pages/BookRoom';
import MyRooms from './pages/MyRooms';
import User from './pages/User';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Container>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/book-room" element={<BookRoom />} />
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
