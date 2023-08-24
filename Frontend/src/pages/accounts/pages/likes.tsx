import { Box, CircularProgress, Divider, IconButton, LinearProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener, useGridApiRef } from "@mui/x-data-grid";
import { FormatThai } from "../../../utils/date";
import { useEffect, useState } from "react";
import { Favorite } from "@mui/icons-material";
import { useQuery, useMutation } from 'react-query';
import axios from "../../../api/axios";

const columns: GridColDef[] = [
    { field: 'id', headerName: "#" },
    { field: 'name', headerName: 'ชื่อ', flex: 2 },
    {
        field: 'created_at', headerName: 'เวลา', flex: 2, valueFormatter: (params) => {
            return FormatThai(new Date(params.value))
        }
    }
];

interface Like {
    id: number,
    name: string,
    created_at: Date
}

const fetchLikes = () => {
    try {
        return axios.get("/api/likes")
    } catch (e) {
        console.log('error : ', e);
    }
}

const Index = () => {
    const tableRef = useGridApiRef();
    const [Hover, setHover] = useState<number | null>(null);
    const [Likes, setLikes] = useState<Like[]>([]);
    const { isLoading, error, data } = useQuery("Likes", fetchLikes);
    const { mutate: MutateUnLike, isLoading: unLikeLoading } = useMutation(async (LikeId: number) => {
        return await axios.delete(`/api/likes/${LikeId}`)
            .then(() => {
                setHover(null)
                setLikes((oldLikes) => {
                    const index = oldLikes.findIndex(data => data.id === LikeId);

                    if (index !== -1) {
                        // Create a new array without the deleted category
                        const newLikes = oldLikes.slice();
                        newLikes.splice(index, 1);

                        return newLikes;
                    }

                    return oldLikes;
                });
            }).catch(() => {
            })
    })

    useEffect(() => {
        if (data?.data) {
            setLikes(data.data);
        }
    }, [data])

    useEffect(() => {
        const handleRowClick: GridEventListener<'rowClick'> = (params) => {
            setHover(params.row.id)
        };

        return tableRef.current.subscribeEvent('rowClick', handleRowClick);
    }, [tableRef]);

    if (error) {
        return <p>ERROR LOADING</p>
    }

    return (
        <Box sx={{
            py: 2,
            textAlign: "center"
        }}>
            <DataGrid
                rows={Likes}
                columns={columns}
                apiRef={tableRef}
                style={{
                    display: Likes.length > 0 ? ("block") : "none",
                    border: "none"
                }}
            />

            {Likes.length <= 0 ? (
                isLoading ? (
                    <CircularProgress></CircularProgress>
                ) : (
                    <Typography
                        sx={{
                            mx: "auto"
                        }}
                    >
                        ไม่มีประวัติการกดไลค์
                    </Typography>
                )
            ) : (null)}

            {
                Hover != null ? (
                    <>
                        <Divider sx={{ my: 2 }}></Divider>
                        
                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                           {!unLikeLoading ? (
                                <IconButton
                                    onClick={() => MutateUnLike(Hover)}
                                    sx={{float: "left"}}
                                    
                                >
                                    <Favorite
                                        color="primary"
                                    ></Favorite>
                                </IconButton>
                            ): (
                                <LinearProgress />
                            )} 
                        </Box>
                    </>
                ) : null
            }
        </Box>
    )
}

export default Index;