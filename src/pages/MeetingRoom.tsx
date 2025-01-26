import { useState } from 'react'
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
    CardMedia
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';

interface MeetingRoomProps {
    id: number
    meetingRoomNo: string
    meetingRoomName: string
    seating: number
    status: 'Available' | 'Occupied'
    type: 'Conference' | 'Private' | 'Open'
    availableTime: [string, string],
    coverImage: string,
    mark: string
}

interface MeetingRoomEffectiveDateProps {
    startDate: dayjs.Dayjs | null;
    endDate: dayjs.Dayjs | null;
}



export default function MeetingRoom() {
    const [meetRooms, setMeetRooms] = useState<MeetingRoomProps[]>([
        {
            id: 1,
            meetingRoomNo: 'MR101',
            meetingRoomName: 'Phuket Island - 普吉岛',
            seating: 20,
            status: 'Available',
            type: 'Conference',
            availableTime: ['2025-01-22', '2025-01-23'],
            coverImage: "MeetingRoom1.jpg",
            mark: 'Spacious room',
        },
        {
            id: 2,
            meetingRoomNo: 'MR102',
            meetingRoomName: 'Koh Samui - 苏梅岛',
            seating: 15,
            status: 'Occupied',
            type: 'Conference',
            availableTime: ['2025-01-24', '2025-01-25'],
            coverImage: "MeetingRoom2.png",
            mark: 'Cozy private meeting space',
        },
        {
            id: 3,
            meetingRoomNo: 'MR103',
            meetingRoomName: 'Lombok Island',
            seating: 5,
            status: 'Occupied',
            type: 'Conference',
            availableTime: ['2024-01-01', '2025-01-01'],
            coverImage: "MeetingRoom3.jpg",
            mark: 'Cozy private meeting space',
        },
        {
            id: 4,
            meetingRoomNo: 'MR103',
            meetingRoomName: 'Taiwan - 天安门会议室',
            seating: 5,
            status: 'Occupied',
            type: 'Conference',
            availableTime: ['2025-01-01', '2025-01-30'],
            coverImage: "MeetingRoom4.jpg",
            mark: 'Cozy private meeting space',
        }
    ])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [currentMeetRoom, setCurrentMeetRoom] = useState<Partial<MeetingRoomProps> | null>(null)
    const [availableTime, setAvailableTime] = useState<[string | null, string | null]>([null, null])
    const [meetingRoomEffectiveDate, setMeetingRoomEffectiveDate] = useState<MeetingRoomEffectiveDateProps | null>(null);

    const handleStartDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setAvailableTime([formattedDate, availableTime[1]])
        }
    };

    const handleEndDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setAvailableTime([availableTime[0], formattedDate])
        }
    };

    const openDrawer = (room: MeetingRoomProps | null) => {
        setCurrentMeetRoom(room)

        if (room) {
            setMeetingRoomEffectiveDate({
                startDate: dayjs(room.availableTime[0]),
                endDate: dayjs(room.availableTime[1]),
            });
        }

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
            coverImage: currentMeetRoom.coverImage || '',
            mark: currentMeetRoom.mark || '',
        }

        if (currentMeetRoom.id) {
            setMeetRooms((prev) => prev.map((room) => (room.id === currentMeetRoom.id ? updatedMeetRoom : room)))
        } else {
            updatedMeetRoom.coverImage = "MeetingRoom2.png";
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
                            <CardMedia
                                component="img"
                                alt={`Cover of ${room.meetingRoomName}`}
                                width="300"
                                height="200"
                                image={`/cover/${room.coverImage}`}
                            />
                            <CardContent>
                                <Grid container justifyContent="space-between" alignItems="flex-start">
                                    <Grid item xs={8}>
                                        <Typography variant="h6">{room.meetingRoomName}</Typography>
                                        <Typography>Room No: {room.meetingRoomNo}</Typography>
                                        <Typography>Seating: {room.seating}</Typography>
                                        <Typography>Status: {room.status}</Typography>
                                        <Typography>Type: {room.type}</Typography>
                                    </Grid>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            bottom: -100,
                                            right: 16
                                        }}
                                    >
                                        <IconButton onClick={() => openDrawer(room)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(room.id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>

                                </Grid>
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
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                            <DatePicker
                                label="Start Date"
                                value={meetingRoomEffectiveDate?.startDate}
                                onChange={(newValue: any) => handleStartDateChange(newValue)}
                            />
                            <DatePicker
                                label="End Date"
                                value={meetingRoomEffectiveDate?.endDate}
                                onChange={(newValue: any) => handleEndDateChange(newValue)}
                            />
                        </Box>
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