import React, { useState } from 'react'
import {
    Typography,
    Button,
    Drawer,
    TextField,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Card,
    CardContent,
    IconButton,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface MeetingRoomProps {
    id: number
    meetingRoomNo: string
    meetingRoomName: string
    seating: number
    status: 'Available' | 'Occupied'
    type: 'Conference' | 'Private' | 'Open'
    availableTime: [string, string]
    mark: string
}

export default function MeetingRoom() {

    const [meetRooms, setMeetRooms] = useState<MeetingRoomProps[]>([
        {
            id: 1,
            meetingRoomNo: 'MR101',
            meetingRoomName: 'Phuket Island',
            seating: 20,
            status: 'Available',
            type: 'Conference',
            availableTime: ['2025-01-22', '2025-01-23'],
            mark: 'Spacious room with projector',
        },
        {
            id: 2,
            meetingRoomNo: 'MR102',
            meetingRoomName: 'Koh Samui',
            seating: 15,
            status: 'Occupied',
            type: 'Conference',
            availableTime: ['2025-01-24', '2025-01-25'],
            mark: 'Cozy private meeting space',
        },
        {
            id: 3,
            meetingRoomNo: 'MR103',
            meetingRoomName: 'Private Room A',
            seating: 5,
            status: 'Occupied',
            type: 'Conference',
            availableTime: ['2025-01-24', '2025-01-25'],
            mark: 'Cozy private meeting space',
        },
        {
            id: 4,
            meetingRoomNo: 'MR103',
            meetingRoomName: 'Private Room A',
            seating: 5,
            status: 'Occupied',
            type: 'Conference',
            availableTime: ['2025-01-24', '2025-01-25'],
            mark: 'Cozy private meeting space',
        }
    ])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [currentMeetRoom, setCurrentMeetRoom] = useState<Partial<MeetingRoomProps> | null>(null)
    const [availableTime, setAvailableTime] = useState<[string | null, string | null]>([null, null])

    const openDrawer = (room: Partial<MeetingRoomProps> | null) => {
        setCurrentMeetRoom(room)
        setAvailableTime(room?.availableTime || [null, null])
        setIsDrawerOpen(true)
    }

    const closeDrawer = () => {
        setCurrentMeetRoom(null)
        setAvailableTime([null, null])
        setIsDrawerOpen(false)
    }

    const handleSubmit = () => {
        if (!currentMeetRoom) return;

        const updatedMeetRoom: MeetingRoomProps = {
            id: currentMeetRoom.id || Date.now(),
            meetingRoomNo: currentMeetRoom.meetingRoomNo || '',
            meetingRoomName: currentMeetRoom.meetingRoomName || '',
            seating: currentMeetRoom.seating || 0,
            status: currentMeetRoom.status || 'Available',
            type: currentMeetRoom.type || 'Conference',
            availableTime: [availableTime[0] || '', availableTime[1] || ''] as [string, string],
            mark: currentMeetRoom.mark || '',
        }

        if (currentMeetRoom.id) {
            setMeetRooms((prev) => prev.map((room) => (room.id === currentMeetRoom.id ? updatedMeetRoom : room)))
        } else {
            setMeetRooms((prev) => [...prev, updatedMeetRoom])
        }

        closeDrawer();
    }

    const handleDelete = (id: number) => {
        setMeetRooms((prev) => prev.filter((room) => room.id !== id))
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>

            </Typography>
            <Button variant="contained" color="primary" onClick={() => openDrawer(null)}>
                Create New Room
            </Button>
            <Grid container spacing={3} mt={3}>
                {meetRooms.map((room) => (
                    <Grid item xs={12} md={6} key={room.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{room.meetingRoomName}</Typography>
                                <Typography>Room No: {room.meetingRoomNo}</Typography>
                                <Typography>Seating: {room.seating}</Typography>
                                <Typography>Status: {room.status}</Typography>
                                <Typography>Type: {room.type}</Typography>
                                <Typography>
                                    Available Time: {room.availableTime[0]} to {room.availableTime[1]}
                                </Typography>
                                <Typography>Mark: {room.mark}</Typography>
                                <IconButton>
                                    <EditIcon onClick={() => openDrawer(room)} />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon onClick={() => handleDelete(room.id)} />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
                <Box p={3} width={400}>
                    <Typography variant="h5" gutterBottom>
                        {currentMeetRoom?.id ? 'Edit Meeting Room' : 'Create Meeting Room'}
                    </Typography>
                    <TextField
                        label="Meeting Room No"
                        fullWidth
                        margin="normal"
                        value={currentMeetRoom?.meetingRoomNo || ''}
                        onChange={(e) => setCurrentMeetRoom({ ...currentMeetRoom, meetingRoomNo: e.target.value })}
                    />
                    <TextField
                        label="Meeting Room Name"
                        fullWidth
                        margin="normal"
                        value={currentMeetRoom?.meetingRoomName || ''}
                        onChange={(e) => setCurrentMeetRoom({ ...currentMeetRoom, meetingRoomName: e.target.value })}
                    />
                    <TextField
                        label="Seating"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={currentMeetRoom?.seating || ''}
                        onChange={(e) => setCurrentMeetRoom({ ...currentMeetRoom, seating: parseInt(e.target.value, 10) })}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={currentMeetRoom?.status || 'Available'}
                            onChange={(e) => setCurrentMeetRoom({ ...currentMeetRoom, status: e.target.value as 'Available' | 'Occupied' })}
                        >
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Occupied">Occupied</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={currentMeetRoom?.type || 'Conference'}
                            onChange={(e) => setCurrentMeetRoom({ ...currentMeetRoom, type: e.target.value as 'Conference' | 'Private' | 'Open' })}
                        >
                            <MenuItem value="Conference">Conference</MenuItem>
                            <MenuItem value="Private">Private</MenuItem>
                            <MenuItem value="Open">Open</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={availableTime[0]}
                            onChange={(date: any) => setAvailableTime([date?.toISOString().split('T')[0] || null, availableTime[1]])}
                            slots={{
                                textField: (params) => (
                                    <TextField {...params} fullWidth margin="normal" />
                                ),
                            }}
                        />
                        <DatePicker
                            label="End Date"
                            value={availableTime[1]}
                            onChange={(date: any) => setAvailableTime([availableTime[0], date?.toISOString().split('T')[0] || null])}
                            slots={{
                                textField: (params) => (
                                    <TextField {...params} fullWidth margin="normal" />
                                ),
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Mark"
                        fullWidth
                        margin="normal"
                        value={currentMeetRoom?.mark || ''}
                        onChange={(e) => setCurrentMeetRoom({ ...currentMeetRoom, mark: e.target.value })}
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    )
}