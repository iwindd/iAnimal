import React, { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import WarningWarn from '../../../components/warning';
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    FormControl
} from '@mui/material';

const RegisterForm: React.FC = () => {
    const { Register, Warning, errors } = useAuthContext();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password_confirmation, setPasswordConfirmation] = useState<string>('');

    const navigate = useNavigate()

    const handleRegister = (e: any) => {
        e.preventDefault()
        Register(name, email, password, password_confirmation)
    };

    return (
        <Grid container justifyContent="center" marginTop={6} style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <FormControl onSubmit={handleRegister} fullWidth error={errors != null}>
                        <Typography variant="h5" align="center" gutterBottom>
                            สมัครสมาชิก
                        </Typography>
                        <TextField
                            label="ชื่อ"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            autoComplete='off'
                            onChange={(e) => setName(e.target.value)}
                        />
                        {Warning(errors?.errors['name'])}
                        <TextField
                            label="อีเมล"
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
                        <TextField
                            label="ยืนยันรหัสผ่าน"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        {Warning(errors?.errors['password_confirmation'])}
                        <WarningWarn></WarningWarn>
                        <Button
                            variant="contained"
                            style={{ padding: "1em", marginTop: "1em" }}
                            color="primary"
                            fullWidth
                            onClick={handleRegister}
                            type='submit'
                        >
                            สมัครสมาชิก
                        </Button>

                        <Typography
                            onClick={() => navigate('/signin')}
                            color={'primary'}
                            sx={{
                                cursor: 'pointer',
                                mx: 'auto',
                                mt: 2
                            }}
                        >
                            Sign in ?
                        </Typography>
                    </FormControl>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default RegisterForm;
