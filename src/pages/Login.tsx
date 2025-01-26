import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('tony.zhang@shinetechsoftware.com');
    const [password, setPassword] = useState('123456');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
        navigate('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h5">Login</Typography>
                <Box sx={{ mt: 2 }} />
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" fullWidth>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    )
}