import {useEffect} from 'react';
import { Alert } from '@mui/material';
import { useInterfaceContext } from '../context/InterfaceContext';

export default function Warning({id} : {id?: string}) {
    const {Warning: {
        setWarning,
        Message,
        Id,
        Type
    }} = useInterfaceContext();
    
    useEffect(() => {
        setWarning("");
    }, [])

    return (
        <>
            {(Message && id == Id || null) ? (
                <Alert variant="filled" severity={Type}>
                    {Message}
                </Alert>
            ) : (null)}
        </>
    )
}