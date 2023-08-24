import { useState } from 'react';
import { Add as Plus } from '@mui/icons-material';
import Dialog from './dialog';
import { useAuthContext } from '../../context/AuthContext';
import {
    Fab
} from '@mui/material';



export default function Index() {
    const [State, setState] = useState<boolean>(false);
    const { isLogged, user } = useAuthContext();

    if (!isLogged()) return null;
    if (user.permission !== 1) return null;

    return (
        <>
            <Dialog
                State={State}
                setState={setState}
            ></Dialog>
            <Fab
                size="medium"
                color="primary"
                aria-label="add"
                onClick={() => setState(true)}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    m: 3
                }}
            >
                <Plus />
            </Fab>
        </>
    );
}
