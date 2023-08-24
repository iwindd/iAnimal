import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface ConfirmationProps {
    title: string,
    text: string,
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>;

    confirm: () => void,
    buttons?: {
        confirm?: string,
        cancel?: string
    }
}

export default function AlertDialog(props : ConfirmationProps) {
    const [confirmLabel] = React.useState<string>(props.buttons?.confirm || "ยืนยัน");
    const [cancelLabel]  = React.useState<string>(props.buttons?.cancel || "ยกเลิก"); 

    const handleClose = () => {
        props.setState(false);
    }

    return (
        <Dialog
            open={props.state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {cancelLabel}
                </Button>
                <Button onClick={props.confirm} autoFocus>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}