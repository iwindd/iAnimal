import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import '@fontsource/sarabun/300.css';
import '@fontsource/sarabun/400.css';
import '@fontsource/sarabun/500.css';
import '@fontsource/sarabun/700.css';

import { AuthProvider } from './context/AuthContext';
import { InterfaceProvider } from './context/InterfaceContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClientProvider, QueryClient } from 'react-query';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Sarabun',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Sarabun';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                }

                ::-webkit-scrollbar {
                    display: none;
                }
            `,
        }
    },
});

/* COMPONENTS */
import Navbar from './components/navbar'

/* PAGE */
import Animal from './pages/home/index';
import Category from './pages/categories/index';
import Account from './pages/accounts/index';
import { Login, Register } from './pages/auth';
import Users from './pages/users';

/* MIDDLE WARE */

import GuestMiddleware from './middlewares/guest';
import AdminMiddleware from './middlewares/admin';
import LoggedMiddleware from './middlewares/logged';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <InterfaceProvider>
                            <AuthProvider>
                                <Navbar></Navbar>
                                <Routes>
                                    <Route path='/*' element={<Animal />}></Route>

                                    <Route element={<AdminMiddleware></AdminMiddleware>}>
                                        <Route path="/categories" element={<Category></Category>}></Route>
                                        <Route path="/users" element={<Users></Users>}></Route>
                                    </Route>

                                    <Route element={<GuestMiddleware></GuestMiddleware>}>
                                        <Route path='/signin' element={<Login></Login>}></Route>
                                        <Route path='/signup' element={<Register></Register>}></Route>
                                    </Route>

                                    <Route element={<LoggedMiddleware></LoggedMiddleware>}>
                                        <Route path='/account' element={<Account></Account>}></Route>
                                    </Route>
                                </Routes>
                            </AuthProvider>
                        </InterfaceProvider>
                    </LocalizationProvider>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
