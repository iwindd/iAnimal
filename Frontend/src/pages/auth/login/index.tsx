import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, FormControl } from '@mui/material';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import WarningWarn from '../../../components/warning';

const LoginForm: React.FC = () => {
    const { Login, Warning, errors } = useAuthContext();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        Login(email, password)
    };

    return (
        <Grid container justifyContent="center" marginTop={6} style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <FormControl onSubmit={handleLogin} fullWidth error={errors != null}>
                        <Typography variant="h5" align="center" gutterBottom>
                            เข้าสู่ระบบ
                        </Typography>
                        <TextField
                            label="ชื่อผู้ใช้"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {Warning(errors?.errors['email'])}
                        <TextField
                            label="รหัสผ่าน"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {Warning(errors?.errors['password'])}

                        <WarningWarn></WarningWarn>
                        <Button
                            variant="contained"
                            style={{ padding: "1em", marginTop: "1em" }}
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                        >
                            เข้าสู่ระบบ
                        </Button>

                        <Typography
                            onClick={() => navigate('/signup')}
                            color={'primary'}
                            sx={{
                                cursor: 'pointer',
                                mx: 'auto',
                                mt: 2
                            }}
                        >
                            Sign up ?
                        </Typography>
                    </FormControl>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginForm;
