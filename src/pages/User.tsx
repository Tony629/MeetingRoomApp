import { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Drawer,
    TextField,
    Grid,
    Select,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress
} from '@mui/material';
import { DataGrid, GridColDef, GridRowData } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";

interface UserProps {
    id: number;
    UserNo: string;
    NickName: string;
    Email: string;
    Role: string;
    MobilePhone: string;
    Password: string;
}

const mockUsers: UserProps[] = [
    { id: 1, UserNo: "U001", NickName: "John Doe1", Email: "john@example.com", Role: "Administrator", MobilePhone: "123-456-7890", Password: "password123" },
    { id: 2, UserNo: "U002", NickName: "Jane Doe2", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 3, UserNo: "U003", NickName: "Jane Doe3", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 4, UserNo: "U004", NickName: "Jane Doe4", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 5, UserNo: "U005", NickName: "Jane Doe5", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 6, UserNo: "U006", NickName: "Jane Doe6", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 7, UserNo: "U007", NickName: "Jane Doe7", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 8, UserNo: "U008", NickName: "Jane Doe8", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 9, UserNo: "U009", NickName: "Jane Doe9", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 10, UserNo: "U0010", NickName: "Jane Doe10", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 11, UserNo: "U0011", NickName: "Jane Doe11", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 12, UserNo: "U0012", NickName: "Jane Doe12", Email: "jane@example.com", Role: "General", MobilePhone: "987-654-3210", Password: "password456" },
];

export default function User() {
    const [users, setUsers] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editUser, setEditUser] = useState<GridRowData | null>(null);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "UserNo", headerName: "UserNo", width: 150 },
        { field: "NickName", headerName: "NickName", width: 150 },
        { field: "Email", headerName: "Email", width: 200 },
        { field: "Role", headerName: "Role", width: 100 },
        { field: "MobilePhone", headerName: "MobilePhone", width: 180 },
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleEdit(params.row)} startIcon={<Edit />} color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(params.row.id)} startIcon={<Delete />} color="secondary">Delete</Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setUsers(mockUsers);
            setLoading(false);
        }, 10);
    }, [])

    const handleEdit = (user: GridRowData) => {
        setEditUser(user);
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setEditUser(null);
        setOpenDrawer(false);
    };

    const handleDelete = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleCreateNew = () => {
        setEditUser(null);
        setOpenDrawer(true);
    };

    const handleSubmit = (user: any) => {
        if (editUser) {
            setUsers(users.map((u) => (u.id === user.id ? user : u)));
        } else {
            const newUser = { ...user, id: users.length + 1 };
            setUsers([...users, newUser]);
        }

        handleCloseDrawer();
    };

    return (

        <Box>
            <Typography variant="h4" gutterBottom>

            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleCreateNew()}>
                Create New User
            </Button>
            <Grid container spacing={4} mt={3}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <DataGrid
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        loading={loading}
                        pageSizeOptions={[10, 20, 30]}
                        checkboxSelection
                        rows={users}
                        columns={columns}
                        pagination
                    />
                )}
            </Grid>

            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={handleCloseDrawer}
                sx={{ width: 400 }}
            >
                <Box p={3} width={400}>
                    <Typography variant="h6" gutterBottom>
                        {editUser ? "Edit User" : "Create New User"}
                    </Typography>
                    <TextField
                        label="UserNo"
                        fullWidth
                        defaultValue={editUser ? editUser.UserNo : ""}
                        margin="normal"
                        onChange={(e) => setEditUser({ ...editUser, UserNo: e.target.value })}
                    />
                    <TextField
                        label="NickName"
                        fullWidth
                        defaultValue={editUser ? editUser.NickName : ""}
                        margin="normal"
                        onChange={(e) => setEditUser({ ...editUser, NickName: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        defaultValue={editUser ? editUser.Email : ""}
                        margin="normal"
                        onChange={(e) => setEditUser({ ...editUser, Email: e.target.value })}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={editUser?.Role || 'General'}
                            onChange={(e) => setEditUser({ ...editUser, Role: e.target.value as 'General' | 'Administrator' })}
                        >
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Administrator">Administrator</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="MobilePhone"
                        fullWidth
                        defaultValue={editUser ? editUser.MobilePhone : ""}
                        margin="normal"
                        onChange={(e) => setEditUser({ ...editUser, MobilePhone: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        defaultValue={editUser ? editUser.Password : ""}
                        margin="normal"
                        onChange={(e) => setEditUser({ ...editUser, Password: e.target.value })}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() => handleSubmit(editUser || {})}
                    >
                        Save
                    </Button>
                </Box>
            </Drawer>
        </Box >
    )
}