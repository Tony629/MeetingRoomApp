import { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Drawer,
    TextField,
    Grid,
    Box
} from '@mui/material';
import { DataGrid, GridColDef, GridRowData } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";

interface UserProps {
    id: number;
    UserNo: string;
    NickName: string;
    Email: string;
    MobilePhone: string;
    Password: string;
}

const mockUsers: UserProps[] = [
    { id: 1, UserNo: "U001", NickName: "John Doe1", Email: "john@example.com", MobilePhone: "123-456-7890", Password: "password123" },
    { id: 2, UserNo: "U002", NickName: "Jane Doe2", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 3, UserNo: "U003", NickName: "Jane Doe3", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 4, UserNo: "U004", NickName: "Jane Doe4", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 5, UserNo: "U005", NickName: "Jane Doe5", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 6, UserNo: "U006", NickName: "Jane Doe6", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 7, UserNo: "U007", NickName: "Jane Doe7", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 8, UserNo: "U008", NickName: "Jane Doe8", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 9, UserNo: "U009", NickName: "Jane Doe9", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 10, UserNo: "U0010", NickName: "Jane Doe10", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 11, UserNo: "U0011", NickName: "Jane Doe11", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
    { id: 12, UserNo: "U0012", NickName: "Jane Doe12", Email: "jane@example.com", MobilePhone: "987-654-3210", Password: "password456" },
];

export default function User() {
    const [users, setUsers] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "UserNo", headerName: "UserNo", width: 150 },
        { field: "NickName", headerName: "NickName", width: 150 },
        { field: "Email", headerName: "Email", width: 200 },
        { field: "MobilePhone", headerName: "MobilePhone", width: 180 },
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
                <>
                    <Button startIcon={<Edit />} color="primary">Edit</Button>
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

    const handleDelete = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (

        <Box>
            <Typography variant="h4" gutterBottom>

            </Typography>
            <Button variant="contained" color="primary">
                Create New User
            </Button>
            <Grid container spacing={3} mt={3}>
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
            </Grid>
        </Box>
    )
}