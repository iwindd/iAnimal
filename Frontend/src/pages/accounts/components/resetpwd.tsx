import { Dialog, Button, FormControl, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, Box } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useInterfaceContext } from "../../../context/InterfaceContext";
import axios from "../../../api/axios";
import Warning from "../../../components/warning";
import { useAuthContext } from "../../../context/AuthContext";


interface DialogProps {
    State: boolean;
    setState: Dispatch<SetStateAction<boolean>>
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Index(props: DialogProps) {
    const [old, setPwdOld] = useState<string>("");
    const [password, setPwd] = useState<string>("");
    const [password_confirmation, setPwdConfirmation] = useState<string>("");
    const {
        Backdrop: {
            setBackdrop
        },
        Warning: {
            useWarning
        }
    } = useInterfaceContext()

    const { Warning: WarningError, errors, setErrors } = useAuthContext();

    const SwitchBackdrop = (State: boolean) => {
        setBackdrop(State)
        props.setState(!State);
    }

    const Saved = async () => {
        SwitchBackdrop(true);

        axios.put('/api/update-password', {
            old_password: old, // Replace with the actual old password value
            new_password: password, // Replace with the actual new password value
            new_password_confirmation: password_confirmation // Replace with the actual new password confirmation value
        }).then(() => {
            setBackdrop(false);
            props.setState(false);
            setPwdOld("");
            setPwd("");
            setPwdConfirmation("");
            useWarning("คุณเปลี่ยนรหัสผ่านสำเร็จแล้ว", "success")
        }).catch((e) => {
            if (e.response.status === 422) {
                setErrors(e.response.data)
            } else {
                useWarning(`รหัสผ่านเก่าไม่ถูกต้องกรุณาลองใหม่อีกครั้ง!`, 'error', 'dialogMessage');
            };

            SwitchBackdrop(false);
        });
    };

    return (
        <Dialog
            open={props.State}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setState(false)}
            fullWidth
            maxWidth="sm"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>แก้ไขรหัสผ่าน</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Warning id="dialogMessage"></Warning>
                    <FormControl sx={{ m: 1, mt: 2 }} fullWidth error={errors != null}>
                        <TextField
                            label="รหัสผ่านเก่า"
                            variant="outlined"
                            type="password"
                            value={old}
                            onChange={(e) => setPwdOld(e.target.value)}
                            fullWidth
                            autoComplete="off"
                            sx={{ mb: 1.5 }}
                        />
                        <Box sx={{ mb: 1.5 }}>
                            {WarningError(errors?.errors['old_password'])}
                        </Box>
                        <TextField
                            label="รหัสผ่านใหม่"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPwd(e.target.value)}
                            fullWidth
                            autoComplete="off"
                            sx={{ mb: 1.5 }}
                        />
                        <Box sx={{ mb: 1.5 }}>
                            {WarningError(errors?.errors['new_password'])}
                        </Box>

                        <TextField
                            label="ยืนยันรหัสผ่านใหม่"
                            variant="outlined"
                            type="password"
                            value={password_confirmation}
                            onChange={(e) => setPwdConfirmation(e.target.value)}
                            fullWidth
                            autoComplete="off"
                            sx={{ mb: 1.5 }}
                        />

                    </FormControl>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setState(false)}>ปิด</Button>
                <Button onClick={Saved}>บันทึก</Button>
            </DialogActions>
        </Dialog>
    )
}