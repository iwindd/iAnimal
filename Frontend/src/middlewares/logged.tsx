import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function index(){
    const {isLogged, FetchingUser} = useAuthContext();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (!FetchingUser ) {
            setIsLoading(false);
        }
    }, [FetchingUser]);

    if (isLoading) {
        return <Outlet />;
    }

    return (isLogged() && !FetchingUser) ? <Outlet></Outlet> : <Navigate to="/signin"></Navigate>
}