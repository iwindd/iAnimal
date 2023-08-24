import * as React from 'react'
import { Button, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import { useInterfaceContext } from '../../context/InterfaceContext'
import { useAuthContext } from '../../context/AuthContext';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import axios from '../../api/axios';

function Create({ state, setState }: {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [UserData, setUserData] = React.useState<{
        name: string,
        email: string,
        password: string,
        permission: string,
    }>({ name: "", email: "", password: "", permission: "0" })
    const { Warning, errors } = useAuthContext();
    const { Backdrop: { setBackdrop } } = useInterfaceContext();
    const queryClient = useQueryClient();
    const SwitchBackdrop = (state: boolean) => {
        setBackdrop(state);
        setState(!state);
    }

    const setValue = (key: "name" | "email" | "password" | "permission", val: string) => {
        setUserData((data) => {
            const updatedData = { ...data }; // Create a copy of the data
            updatedData[key] = val; // Update the property
            return updatedData; // Return the updated object
        });
    }

    const { mutate } = useMutation(async () => {
        SwitchBackdrop(true)
        
        return axios.post("/api/users", {
            name: UserData.name,
            email: UserData.email,
            password: UserData.password,
            password_confirmation: UserData.password,
            permission: parseInt(UserData.permission) == 1 ? 1:0
        }).then(() => {
            queryClient.invalidateQueries("Users");
            setUserData({ name: "", email: "", password: "", permission: "0" });
            setBackdrop(false);
            setState(false);

        }).catch((e) => {
            console.log('catch', e);
            SwitchBackdrop(false)
        })
    })

    return (
        <Dialog open={state} onClose={() => setState(false)} maxWidth="sm" fullWidth>
            <DialogTitle>เพิ่มผู้ใช้</DialogTitle>
            <DialogContent>
                <FormControl fullWidth error={errors != null} >
                    <TextField
                        label="ชื่อ"
                        variant="outlined"
                        fullWidth
                        value={UserData.name}
                        onChange={(e) => setValue('name', e.target.value)}
                        margin="normal"
                        autoComplete='off'
                    />
                     {Warning(errors?.errors['name'])}
                    <TextField
                        label="อีเมล"
                        variant="outlined"
                        fullWidth
                        value={UserData.email}
                        onChange={(e) => setValue('email', e.target.value)}

                        margin="normal"
                        autoComplete='off'
                    />
                     {Warning(errors?.errors['email'])}
                    <TextField
                        label="รหัสผ่าน"
                        variant="outlined"
                        type="password"
                        value={UserData.password}
                        onChange={(e) => setValue('password', e.target.value)}

                        fullWidth
                        margin="normal"
                        autoComplete="new-password"
                    />
                     {Warning(errors?.errors['password'])}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="permission-label">สถานะ</InputLabel>
                        <Select
                            labelId="permission-label"
                            id="permission-form"
                            value={UserData.permission}
                            onChange={(e) => setValue('permission', e.target.value)}
                            label="สถานะ"
                        >
                            <MenuItem value={0}>ผู้ใช้ปกติ</MenuItem>
                            <MenuItem value={1}>แอดมิน</MenuItem>
                        </Select>
                    </FormControl>
                    {Warning(errors?.errors['permission'])}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setState(false)}>ยกเลิก</Button>
                <Button onClick={() => mutate()}>ยืนยัน</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Create