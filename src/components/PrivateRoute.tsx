import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material'

export default function PrivateRoute() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <Navigate to="/login" />

    return (
        <>
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
            <Outlet />
        </>
    )
}