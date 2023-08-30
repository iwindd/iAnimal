import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Warning, RespErrs } from '../utils/errors';
import { useInterfaceContext } from './InterfaceContext';
import { useQuery } from 'react-query';

interface AuthContextType {
    user: null | any;
    errors: RespErrs | null;
    setErrors: Dispatch<SetStateAction<RespErrs | null>>
    FetchingUser: boolean;
    setBackdrop: Dispatch<SetStateAction<boolean>>;
    Login: (email: string, password: string) => void;
    Register: (
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => void;
    isLogged: () => boolean;
    isAdmin: () => boolean;
    Logout: () => void;
    getUser: () => void;
    Warning: (errors: string[] | null | undefined) => JSX.Element | undefined
}

interface AuthProviderProps {
    children: ReactNode;
}

export type Permission = 0 | 1
export interface User {
    email: string,
    id: number,
    name: string,
    permission: Permission,
    created_at: Date,
    updated_at: Date
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<RespErrs | null>(null);
    const { Backdrop: { setBackdrop }, Warning: { useWarning } } = useInterfaceContext();
    const navigate = useNavigate();

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    useEffect(() => {
        setErrors(null)
    }, [])

    const { isLoading: FetchingUser, data, refetch: getUser } = useQuery('User', async () => {
        return await axios.get("/api/user");
    })

    useEffect(() => {
        setUser(data?.data ? data.data : null);
    }, [data])

    const Login = async (email: string, password: string) => {
        setBackdrop(true)
        await csrf();
        axios.post('/login', {
            email,
            password
        }).then(async () => {
            await getUser();

            if (isLogged()) {
                navigate("/");
            } else {
                useWarning("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง!", 'error')
            }
        }).catch((e) => {
            if (e.response.status === 422) return setErrors(e.response.data);

            useWarning("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง!", "error");
        }).finally(() => {
            setBackdrop(false);
        })
    };

    const Register = async (
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) => {
        setBackdrop(true)
        await csrf();
        axios.post("/register", {
            name,
            email,
            password,
            password_confirmation
        })
            .then(async () => {
                await navigate('/');
                await getUser();
                useWarning("สมัครสมาชิกสำเร็จ!", "success");
            })
            .catch((e) => {
                if (e.response.status === 422) return setErrors(e.response.data);
                useWarning("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งในภายหลัง!", "error");
            })
            .finally(() => {
                setBackdrop(false)
            });
    };

    const Logout = async () => {
        setBackdrop(true)
        axios.post('/logout').then(async () => {
            await setUser(null)
            setBackdrop(false)
            navigate('/signin')
        }).catch(() => setBackdrop(false))
    }

    const isLogged = (): boolean => {
        return user ? true : false
    }

    const isAdmin = (): boolean => {
        if (!isLogged()) return false;

        return user?.permission == 1 ? true : false;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                errors,
                setErrors,
                setBackdrop,
                Login,
                Register,
                Logout,
                isLogged,
                Warning,
                isAdmin,
                getUser,
                FetchingUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

