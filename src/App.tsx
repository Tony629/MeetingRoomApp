import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import BookRoom from './pages/BookRoom';
import MyRooms from './pages/MyRooms';
import User from './pages/User';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material'

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">悟能会议室预约管理系统</Typography>
            <Button color="inherit" href="#">Overall</Button>
            <Button color="inherit" href="#/meeting-room">Meeting Room</Button>
            <Button color="inherit" href="#/book-room">Book Room</Button>
            <Button color="inherit" href="#/user">User</Button>
            <Button color="inherit" href="#/my-rooms">My Rooms</Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-room" element={<BookRoom />} />
            <Route path="/meeting-room" element={<MeetingRoom />} />
            <Route path="/user" element={<User />} />
            <Route path="/my-rooms" element={<MyRooms />} />
          </Routes>
        </Container>
      </Router>
    </>
  )
}

export default App
