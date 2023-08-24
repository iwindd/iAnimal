import React, { Dispatch, SetStateAction } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { useAuthContext } from '../../context/AuthContext';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Slide,
    TextField,
} from '@mui/material';
import Warning from '../warning';

export interface DialogProps {
    Open: boolean;
    onClose: () => void;
    onSave: () => void;
    Title: string;
    Default: string;
    Placeholder: string;
    setValue: Dispatch<SetStateAction<string>>;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Index: React.FC<DialogProps> = (props) => {
    const {errors, Warning:WarningError} = useAuthContext();
    return (
        <Dialog
            open={props.Open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{props.Title}</DialogTitle>

            <DialogContent>

                <DialogContentText id="alert-dialog-slide-description">
                    <FormControl sx={{ m: 1 }} fullWidth error={errors != null}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder={props.Placeholder}
                            value={props.Default}
                            onChange={(e) => {
                                props.setValue(e.target.value)
                            }}
                            autoComplete="off"
                            sx={{ mb: 1.5 }}
                        />
                         {WarningError(errors?.errors['title'])}
                        <Box sx={{ my: 1 }}>
                            <Warning id="category_dialog"></Warning>
                        </Box>
                    </FormControl>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>ปิด</Button>
                <Button onClick={props.onSave}>บันทึก</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Index;