import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridEventListener, useGridApiRef } from '@mui/x-data-grid';
import { Box, CircularProgress, Container, Divider, IconButton, Paper, Typography } from '@mui/material';
import { FormatThai } from '../../utils/date';
import { Add, Edit, Delete } from '@mui/icons-material';
import Dialog from '../../components/category/form';
import Warning from '../../components/warning';
import { Category } from './index';
import { useInterfaceContext } from '../../context/InterfaceContext';
import Confirmation from '../../components/confirmation';
type DialogAction = "INSERT" | "EDIT" | "DELETE";

const columns: GridColDef[] = [
    { field: 'id', headerName: "#" },
    { field: 'title', headerName: 'ประเภท', flex: 2 },
    {
        field: 'created_at', headerName: 'สร้างขึ้นเมื่อ', flex: 2, valueFormatter: (params) => {
            return FormatThai(new Date(params.value))
        }
    }
];

export interface DialogData {
    id: number,
    title: string
}

function Index({
    DialogState,
    setDialogState,
    Categories,
    isLoading,
    insert,
    del,
    edit
}: {
    DialogState: boolean,
    setDialogState: Dispatch<SetStateAction<boolean>>,
    Categories: Category[],
    isLoading: boolean,
    insert: (data: DialogData) => void,
    del: (data: DialogData) => void,
    edit: (data: DialogData) => void
}) {

    const {Warning: {useWarning}} = useInterfaceContext();

    const [Hover, setHover] = useState<number | null>(null);
    const [DialogAction, setDialogAction] = useState<DialogAction>("INSERT");
    const [DialogTitle, setDialogTitle] = useState<string>("");
    const [DialogValue, setDialogValue] = useState<string>("");
    const [DialogPlaceholder, setDialogPlaceholder] = useState<string>("");
    const [DeleteConfirmation, setDeleteConfirmationState] = useState<boolean>(false);
    const tableRef = useGridApiRef();
    useEffect(() => {
        const handleRowClick: GridEventListener<'rowClick'> = (params) => {
            setHover(params.row.id)
        };

        return tableRef.current.subscribeEvent('rowClick', handleRowClick);
    }, [tableRef]);

    const Execute = () => {
        const data: DialogData = {
            id: Hover || 0,
            title: DialogValue
        }

        if (DialogAction == "INSERT") return insert(data);
        if (DialogAction == "EDIT") return edit(data);
        if (DialogAction == "DELETE") return del(data);

        return false;
    }

    return (
        <Container sx={{
            mt: 1.5
        }}>
            <Dialog
                Open={DialogState}
                onSave={Execute}
                onClose={() => {
                    setDialogState(false)
                    useWarning("", "info")
                }}
                Title={DialogTitle}
                Default={DialogValue}
                Placeholder={DialogPlaceholder}
                setValue={setDialogValue}
            ></Dialog>
            <Confirmation
                title='แจ้งเตือน'
                text="กรุณายืนยันที่จะลบประเภทของสัตว์!"
                state={DeleteConfirmation}
                setState={setDeleteConfirmationState}
                confirm={async () => {
                    setDeleteConfirmationState(false);
                    Execute()
                }}
            />

            <Paper sx={{
                p: 2
            }}>
                <Box sx={{ mb: 2 }} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography variant='h4'>ประเภทของสัตว์</Typography>

                    <div>
                        {Hover != null ? (
                            <>
                                <IconButton
                                    onClick={() => {
                                        setDialogTitle("แก้ไขประเภท");
                                        setDialogState(true)
                                        setDialogValue(Categories.find((ct) => ct.id == Hover)?.title || "")
                                        setDialogPlaceholder("ป้อนชื่อที่คุณต้องการจะแก้ไข")
                                        setDialogAction("EDIT")
                                    }}
                                >
                                    <Edit></Edit>
                                </IconButton>

                                <IconButton
                                    onClick={async () => {
                                        await setDialogAction('DELETE');
                                        await setDialogValue("");
                                        setDeleteConfirmationState(true);
                                    }}
                                >
                                    <Delete></Delete>
                                </IconButton>
                            </>
                        ) : null}

                        <IconButton
                            onClick={() => {
                                setDialogTitle("เพิ่มประเภท");
                                setDialogState(true);
                                setDialogValue("");
                                setDialogPlaceholder("ป้อนชื่อประเภทที่คุณต้องการจะลบ")
                                setDialogAction("INSERT")
                            }}
                        >
                            <Add></Add>
                        </IconButton>
                    </div>
                </Box>
                <Warning ></Warning>
                <Divider sx={{ my: 2 }}></Divider>

                <DataGrid
                    rows={Categories}
                    columns={columns}
                    apiRef={tableRef}
                    sx={{
                        display: Categories.length > 0 ? "block" : "none",
                        border: 'none'
                    }}
                />

                {Categories.length <= 0 ? (
                    <Box
                        sx={{
                            textAlign: "center",
                            p: 4
                        }}
                    >
                        {!isLoading ? (
                            <Typography>ไม่มีพบประเภท</Typography>
                        ) : (
                            <CircularProgress />
                        )}
                    </Box>
                ) : null}
            </Paper>
        </Container>
    )
}

export default Index