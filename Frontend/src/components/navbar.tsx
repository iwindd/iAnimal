import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Divider,
} from '@mui/material';

import {
    Login as LoginIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    TypeSpecimen
} from '@mui/icons-material';
import React from 'react';

function Index() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { isLogged, Logout, isAdmin } = useAuthContext()
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={{
            boxShadow: 'none',
            borderBottom: "1px solid #393a3b",
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        iAnimal
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        iAnimal
                    </Typography>

                    <Box sx={{ flexGrow: 0 }} style={{ display: "flex" }} marginLeft='auto'>
                        {isLogged() ? (
                            <>
                                <IconButton
                                    id="basic-IconButton"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    color={open ? "primary" : "default"}
                                >
                                    <PersonIcon></PersonIcon>
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => navigate('/account')}
                                    >
                                        <ListItemIcon>
                                            <PersonIcon></PersonIcon>
                                        </ListItemIcon>
                                        <ListItemText>บัญชีของฉัน</ListItemText>
                                    </MenuItem>
                                    {isAdmin() ? (
                                        <div>
                                            <MenuItem
                                                onClick={() => navigate('/categories')}
                                            >
                                                <ListItemIcon>
                                                    <TypeSpecimen></TypeSpecimen>
                                                </ListItemIcon>
                                                <ListItemText>ประเภทของสัตว์</ListItemText>
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() => navigate('/users')}
                                            >
                                                <ListItemIcon>
                                                    <PersonIcon></PersonIcon>
                                                </ListItemIcon>
                                                <ListItemText>จัดการผู้ใช้งาน</ListItemText>
                                            </MenuItem>
                                        </div>
                                    ) : (null)}
                                    <Divider></Divider>
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            Logout()
                                        }}
                                    >
                                        <ListItemIcon>
                                            <LogoutIcon></LogoutIcon>
                                        </ListItemIcon>
                                        <ListItemText>ออกจากระบบ</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Tooltip title="ลงทะเบียนเข้าใช้">
                                <IconButton
                                    onClick={() => {
                                       /*  if (FetchingUser) return; */
                                        navigate('/signin')
                                    }}
                                >
                                    <LoginIcon></LoginIcon>
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Index;