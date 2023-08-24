import * as React from 'react';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { User, Permission } from '../../context/AuthContext';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowModel, GridRowModes, GridRowModesModel,  GridToolbarQuickFilter } from '@mui/x-data-grid';
import { FormatThai } from '../../utils/date';
import { Add, Cancel, Delete, Edit, Refresh, Save } from '@mui/icons-material';
import { Box, Container, Paper, Button } from '@mui/material'
import Confirmation from '../../components/confirmation';
import axios from '../../api/axios';
import Create from './create';
import Repass from './repass';
const fetchUsers = async () => {
    try {
        return axios.get("/api/users")
    } catch (e) {
        console.log('error : ', e);
    }
}

interface UserUpdater {
    id: number,
    name: string,
    email: string,
    permission: Permission
}

function Index() {
    const [Users, setUsers] = React.useState<User[]>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [createState, setCreateState] = React.useState<boolean>(false);
    const [repassState, setRepassState] = React.useState<boolean>(false);
    const [repassId, setRepassId] = React.useState<number>(0);
    const [confirmationState, setConfirmationState] = React.useState<boolean>(false);
    const [confirmationCallback, setConfirmationCallback] = React.useState<() => void>(() => { });
    const [confirmationData, setConfirmationData] = React.useState<{
        title: string,
        text: string,
    }>({
        title: 'LOADING',
        text: 'LOADING',
    })

    const { isLoading, error, data: queryData, refetch } = useQuery("Users", fetchUsers);

    useEffect(() => {
        if (queryData?.data) setUsers(queryData.data);
    }, [queryData])

    const { isLoading: editLoading, mutate: editMutate } = useMutation(async (data: UserUpdater) => {
        return axios.patch(`/api/users/${data.id}`, data).then(() => refetch());
    })

    const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation(async (id: number) => {
        return axios.delete(`/api/users/${id}`).then(() => refetch());
    })

    const processRowUpdate = (data: GridRowModel) => {
        const updated: UserUpdater = {
            id: data.id,
            name: data.name,
            email: data.email,
            permission: data.permission == 'แอดมิน' ? 1 : 0
        };

        editMutate(updated)
        return data;
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: "#", editable: false },
        { field: 'name', headerName: 'ชื่อ', flex: 2, editable: true },
        { field: 'email', headerName: 'อีเมล', flex: 2, editable: true },
        {
            field: 'permission',
            headerName: 'สถานะ',
            flex: 2,
            type: 'singleSelect',
            valueOptions: ['ผู้ใช้ปกติ', 'แอดมิน'],
            valueGetter: (params) => params.value === 1 ? 'แอดมิน' : 'ผู้ใช้ปกติ',
            editable: true
        },
        {
            field: 'created_at', headerName: 'สร้างขึ้นเมื่อ', flex: 2, editable: false, valueFormatter: (params) => {
                return FormatThai(new Date(params.value))
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'เครื่องมือ',
            width: 100,

            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<Save />} onClick={async () => {
                            setConfirmationState(true);
                            setConfirmationData({
                                title: "แจ้งเตือน",
                                text: `คุณต้องการที่จะแก้ไขข้อมูลหรือไม่`
                            })

                            setConfirmationCallback(() => {
                                return async () => {
                                    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                                    setConfirmationState(false);
                                }
                            })
                        }} label="Save" />,
                        <GridActionsCellItem icon={<Refresh />} onClick={() => {
                            setRepassId(id as number);
                            setRepassState(true);
                        }} label="ResetPassword" />,
                        <GridActionsCellItem icon={<Cancel />} onClick={() => {
                            setRowModesModel({
                                ...rowModesModel,
                                [id]: { mode: GridRowModes.View, ignoreModifications: true },
                            });
                        }} label="Cancel" />,
                    ];
                }

                return [
                    <GridActionsCellItem icon={<Edit />} onClick={() => {
                        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
                    }} label="Edit" />,
                    <GridActionsCellItem icon={<Delete />} onClick={() => {
                        setConfirmationState(true);
                        setConfirmationData({
                            title: "แจ้งเตือน",
                            text: `คุณต้องการที่จะลบข้อมูลหรือไม่`
                        })

                        setConfirmationCallback(() => {
                            return async () => {
                                // Call the deleteMutate function to delete the user
                                await deleteMutate(typeof id === 'string' ? parseInt(id, 10) : id);

                                // Exit edit mode and close the confirmation dialog
                                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                                setConfirmationState(false);
                            };
                        });
                    }} label="Delete" />,
                ];
            },
        },

    ];

    function Toolbar() {
        const handleClick = () => {
            return setCreateState(true)
        };
        return (
            <Box
                sx={{
                    display: "flex"
                }}
            >
                <Button color="primary" startIcon={<Add></Add>} onClick={handleClick}>
                    เพิ่มผู้ใช้
                </Button>
                <GridToolbarQuickFilter sx={{ marginLeft: "auto" }} />
            </Box>
        );
    }

    if (error) {
        return <p>ERROR</p>
    }

    return (
        <Container sx={{ mt: 1.5 }}>
            <Create
                state={createState}
                setState={setCreateState}
            ></Create>
            <Confirmation
                state={confirmationState}
                setState={setConfirmationState}
                confirm={confirmationCallback}
                {...confirmationData}
            />
            <Repass
                target={repassId}
                state={repassState}
                setState={setRepassState}
            ></Repass>
            <Paper sx={{ height: 520, width: '100%', p: 1 }}>
                <DataGrid
                    columns={columns}
                    rows={Users}
                    loading={isLoading || editLoading || deleteLoading}
                    slots={{ toolbar: Toolbar }}
                    sx={{ border: 'none' }}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    processRowUpdate={processRowUpdate}
                    onRowModesModelChange={(newRowModesModel: GridRowModesModel) => {
                        setRowModesModel(newRowModesModel);
                    }}
                />
            </Paper>
        </Container>
    );
}

export default Index