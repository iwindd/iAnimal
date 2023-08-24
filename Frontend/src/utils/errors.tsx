import FormHelperText from '@mui/material/FormHelperText';

export interface RespErrs {
    message: string;
    errors: Record<string, string[]>;
}

export const Warning = (errors : string[] | null | undefined) => {
    if (errors && errors.length > 0){
        return (
            <FormHelperText>{errors[0]}</FormHelperText>
        )
    }
}
