import * as React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useAuthContext } from '../../context/AuthContext';
import { useMutation } from 'react-query';
import { useInterfaceContext } from '../../context/InterfaceContext';
import axios from '../../api/axios';

function repass({ state, setState, target }: {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    target: number
}) {
    const [password, setPassword] = React.useState<string>("");
    const { Warning, errors } = useAuthContext();
    const { Backdrop: { setBackdrop } } = useInterfaceContext();

    const SwitchBackdrop = (state: boolean) => {
        setBackdrop(state);
        setState(!state);
    }

    const { mutate } = useMutation(async () => {
        SwitchBackdrop(true);
        return await axios.patch(`/api/users/${target}`, { password }).then(() => {
            setPassword("")
            setBackdrop(false);
            setState(false);
        }).catch(() => {
            SwitchBackdrop(false)
        });
    })

    return (
        <Dialog open={state} onClose={() => setState(false)} maxWidth="sm" fullWidth>
            <DialogTitle>แก้ไขรหัสผ่าน</DialogTitle>
            <DialogContent>
                <FormControl fullWidth error={errors != null} >
                    <TextField
                        label="รหัสผ่าน"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        fullWidth
                        margin="normal"
                        autoComplete="new-password"
                    />
                    {Warning(errors?.errors['password'])}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setState(false)}>ยกเลิก</Button>
                <Button onClick={() => mutate()}>ยืนยัน</Button>
            </DialogActions>
        </Dialog>
    )
}

export default repass