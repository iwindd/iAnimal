import { Typography, Grid, TextField, Button, Card, CardContent, CardActions, Divider} from "@mui/material";
import { useAuthContext } from "../../../context/AuthContext";
import { useInterfaceContext } from "../../../context/InterfaceContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ResetPasswordDialog from '../components/resetpwd';
import axios from "../../../api/axios";


interface FieldProps {
    title: string;
    default?: string;
    placeholder: string;
    setState: Dispatch<SetStateAction<string>>;
    disabled?: boolean
}


const Field = (props: FieldProps) => {
    return (
        <>
            <Grid item md={4} sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center"
            }}>
                <Typography>{props.title} :</Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    fullWidth
                    value={props.default}
                    label={props.placeholder}
                    disabled={props.disabled}
                    onChange={(e) => {
                        props.setState(e.target.value)
                    }}
                ></TextField>
            </Grid>
        </>
    )
}

const Index = () => {
    const { user, Warning, FetchingUser, errors, setErrors } = useAuthContext();
    const { Backdrop: { setBackdrop } } = useInterfaceContext();

    const [name, setName] = useState<string>(user?.name);
    const [email, setEmail] = useState<string>(user?.email);
    const [PwdDialogState, setPwdDialogState] = useState<boolean>(false);

    useEffect(() => {
        if (FetchingUser) {
            setName("")
            setEmail("")
        }
    }, [FetchingUser])

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])

    const { Warning: {
        useWarning
    } } = useInterfaceContext();

    const Saved = async () => {
        setBackdrop(true);
        setErrors(null);
        useWarning("");
        await axios.put('/api/update-name', { name: name })
            .then(() => {
                useWarning("เปลี่ยนชื่อสำเร็จ!");
            }).catch(e => {
                if (e.response.status === 422) {
                    setErrors(e.response.data)
                } else {
                    useWarning(`เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!`, 'error');
                };
            });

        setBackdrop(false);
    }

    return (
        <Card>
            <ResetPasswordDialog
                State={PwdDialogState}
                setState={setPwdDialogState}
            ></ResetPasswordDialog>
            <CardContent>
                <Grid container spacing={2}>
                    {FetchingUser ? (
                        <>Loading...</>
                    ) : (
                        <>
                            <Field
                                title="ชื่อ"
                                placeholder="ชื่อของคุณ"
                                default={name}
                                setState={setName}
                            ></Field>

                            <Field
                                title="อีเมล"
                                placeholder="อีเมลของคุณ"
                                default={email}
                                disabled={true}
                                setState={setEmail}
                            ></Field>

                            <Grid item md={4} sx={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center"
                            }}>
                                <Typography></Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Grid item md={12}>
                                    <Typography
                                        color="primary"
                                        style={{
                                            cursor: "Pointer"
                                        }}
                                        onClick={() => {
                                            setPwdDialogState(true)
                                        }}
                                    >รีเซ็ตรหัสผ่าน ?</Typography>

                                    {Warning(errors?.errors['name'])}
                                </Grid>
                            </Grid>
                        </>
                    )}



                </Grid>
            </CardContent>
            <Divider></Divider>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    px: 4,
                    py: 2
                }}
            >
                <Button variant="contained" onClick={Saved}>บันทึก</Button>
            </CardActions>
        </Card>
    )
}

export default Index;