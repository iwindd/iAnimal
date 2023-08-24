import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

import Backdrop from './Interface/Backdrop'

type WarningType = "error" | "info" | "success" | "warning";
interface InterfaceContextType {
    Backdrop: {
        isBackdrop: boolean;
        setBackdrop: Dispatch<SetStateAction<boolean>>;
    },
    Warning: {
        Message: string,
        Type: WarningType,
        Id: string | null,
        setWarning: Dispatch<SetStateAction<string>>,
        useWarning: (message: string, type?: WarningType, id?:string) => void;
    }
}

interface InterfaceProviderProps {
    children: ReactNode
}

const InterfaceContext = createContext<InterfaceContextType | undefined>(undefined);



export const InterfaceProvider: React.FC<InterfaceProviderProps> = ({ children }) => {
    const [isBackdrop, setBackdrop] = useState<boolean>(false);

    const [WarningMessage, setWarning] = useState<string>("");
    const [WarningType, setWarningType] = useState<WarningType>("info");
    const [WarningId, setWarningId] = useState<string | null>(null);

    return (
        <InterfaceContext.Provider
            value={{
                Backdrop : {isBackdrop, setBackdrop},
                Warning  : {
                    Message: WarningMessage,
                    Type: WarningType,
                    Id: WarningId,
                    setWarning: setWarning,
                    useWarning: (message: string, type: WarningType = "success", id?: string) => {
                        setWarning(message);
                        setWarningType(type);
                        setWarningId(id || null)
                    }
                }
            }}
        >
            <Backdrop isBackdrop={isBackdrop}></Backdrop>

            {children}
        </InterfaceContext.Provider>
    )
}

export const useInterfaceContext = (): InterfaceContextType => {
    const context = useContext(InterfaceContext);
    if (!context) {
        throw new Error('InterfaceContext must be used within an AuthProvider');
    }
    return context;
}

