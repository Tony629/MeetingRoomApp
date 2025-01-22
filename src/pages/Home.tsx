import { Typography, Button, Grid, Card, CardContent } from '@mui/material'

export default function AvailableRooms() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Available Rooms</Typography>
            <Grid container spacing={3}>
                {[1, 2, 3].map(room => (
                    <Grid item xs={12} sm={6} md={4} key={room}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Room {room}</Typography>
                                <Button variant="contained" color="primary">Book Now</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )

}

