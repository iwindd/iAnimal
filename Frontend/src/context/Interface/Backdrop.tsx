import React from 'react';
import Backdrop from '@mui/material/Backdrop'; // Import Backdrop component from the correct location
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component

interface BackdropProps {
    isBackdrop: boolean;
}

const CustomBackdrop: React.FC<BackdropProps> = ({ isBackdrop }) => {
    return (
        <Backdrop
            open={isBackdrop}
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default CustomBackdrop;
