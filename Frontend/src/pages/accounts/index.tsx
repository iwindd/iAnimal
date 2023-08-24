import { Favorite, Person } from "@mui/icons-material";
import { Box, Container, Divider, Grid, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material"
import { useState } from "react";

import Account from './pages/account';
import Likes from './pages/likes';
import Warning from "../../components/warning";

interface Item {
    name: string,
    icon: JSX.Element,
    page: JSX.Element,
    label: string,
    default?: boolean
}

const items: Item[] = [
    {
        name: "account",
        icon: <Person />,
        page: <Account></Account>,
        label: "โปรไฟล์",
        default: true
    },
    {
        name: "account",
        icon: <Favorite />,
        page: <Likes></Likes>,
        label: "ประวัตการกดไลค์",
        default: true
    }
]

const Index = () => {
    const [currentPage, setPage] = useState<number>(items.findIndex(xItem => xItem.default == true) || 0);

    return (
        <Container sx={{ mt: 1.5 }}>
            <Paper sx={{
                p: 2
            }}>
                <h1>บัญชีของฉัน</h1>
                <Box sx={{
                    my: 2
                }}>
                    <Warning></Warning>
                </Box>
                <Divider sx={{ my: 3 }}></Divider>

                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        {
                            items.map((item, pageId) => {
                                return (
                                    <ListItemButton
                                        key={pageId}
                                        selected={currentPage == pageId}
                                        onClick={() => setPage(pageId)}
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                )
                            })
                        }
                    </Grid>
                    <Grid item xs={6} md={8}>
                        {items[currentPage].page}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Index;