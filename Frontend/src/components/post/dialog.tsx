import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TransitionProps } from '@mui/material/transitions';
import { Dayjs } from 'dayjs';
import { useQuery, useMutation } from 'react-query';
import { useInterfaceContext } from '../../context/InterfaceContext';
import { FetchCategories, Category } from '../../pages/categories/index';
import { useQueryClient } from 'react-query';
import RichText from '../richtext';
import TypeSelect from './select';
import Warning from '../warning';
import axios from '../../api/axios';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    LinearProgress,
    Slide,
    TextField,
} from '@mui/material';

type action = "insert" | "edit"
interface DialogProps {
    State: boolean;
    setState: Dispatch<SetStateAction<boolean>>;

    default?: {
        id?: number,
        title: string,
        name: string,
        types: string[],
        description: string,
        foundDate: Dayjs | null,
        extinctionDate: Dayjs | null,
        image: string | null,
        action: action
    }
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
    const { Backdrop: { setBackdrop }, Warning: { useWarning } } = useInterfaceContext();

    const [title] = useState<string>(props?.default?.title || "เพิ่มสัตว์ใหม่");

    const [AnimalId] = useState<number | null>(props?.default?.id || null);
    const [Categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState<string>(props?.default?.name || "");
    const [types, setTypes] = useState<string[]>(props?.default?.types || []);
    const [description, setDescription] = useState<string>(props?.default?.description || "");
    const [foundDate, setFoundDate] = useState<Dayjs | null>(props?.default?.foundDate || null);
    const [extinctionDate, setExtinctionDate] = useState<Dayjs | null>(props?.default?.extinctionDate || null);
    const [displayImage, setDisplayImage] = useState<string | null>(props?.default?.image || null);
    const [image, setImage] = useState<File | null>(null);
    const [action] = useState<action>(props?.default?.action || "insert");
    const queryClient = useQueryClient();


    const SwitchBackdrop = (state: boolean) => {
        setBackdrop(state);
        props.setState(!state);
    }

    const { isLoading: isCategoring, data: ctData } = useQuery("Categories", FetchCategories)
    useEffect(() => {
        if (ctData) setCategories(ctData.data);
    }, [ctData]);

    const getData = () => {
        const format = 'YYYY-MM-DD HH-mm-ss';
        const data: {
            name: string,
            detail: string,
            categories: string,
            found: string | undefined,
            image?: File,
            extinction?: string | undefined
        } = {
            name: name,
            detail: description,
            categories: JSON.stringify(types),
            found: foundDate?.format(format)
        }

        if (image != null) data['image'] = image;
        if (extinctionDate) data['extinction'] = extinctionDate?.format(format);

        return data
    }

    const { mutateAsync: InsertData } = useMutation(async () => {
        SwitchBackdrop(true)

        return await axios.post("/api/animals", getData(), {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(() => {
            useWarning(`เพิ่ม "${name}" เรียบร้อยแล้ว`)
            queryClient.invalidateQueries('Feed');
            setName("");
            setDescription("");
            setTypes([]);
            setFoundDate(null);
            setExtinctionDate(null);
            setDisplayImage(null);
            setImage(null);
            setBackdrop(false);
            props.setState(false);
        }).catch((e) => {
            SwitchBackdrop(false)
            useWarning("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!", "error", "animal_dialog");
            console.log('catch', e);
        });
    })

    const { mutateAsync: EditData } = useMutation(async () => {
        SwitchBackdrop(true)

        const format = 'YYYY-MM-DD HH:mm:ss';
        const formData = new FormData();
        formData.append("_method", "patch");
        formData.append('name', name);
        formData.append('detail', description);
        formData.append('categories', JSON.stringify(types));
        if (foundDate) formData.append('found', foundDate.format(format));
        if (extinctionDate) formData.append('extinction', extinctionDate.format(format));
        if (image) formData.append('image', image);

        return await axios.post(`/api/animals/${AnimalId}`, formData).then(() => {
            useWarning(`แก้ไข "${name}" เรียบร้อยแล้ว`)
            queryClient.invalidateQueries('Feed');
            setBackdrop(false);
            props.setState(false);
        }).catch((e) => {
            SwitchBackdrop(false)
            useWarning("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!", "error", "animal_dialog");
            console.log('catch', e);
        });
    })

    return (
        <Dialog
            open={props.State}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setState(false)}
            fullWidth
            maxWidth="xl"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent sx={{ overflow: "hidden" }}>
                <Divider sx={{ my: 2 }} />
                <Grid container>
                    <Grid item md={4} sx={{ pr: 2 }}>
                        <DialogContentText id="alert-dialog-slide-description" >
                            {
                                !isCategoring ? (
                                    <FormControl sx={{ m: 1 }} fullWidth>
                                        <TextField
                                            label="ชื่อสัตว์"
                                            variant="outlined"
                                            fullWidth
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoComplete="off"
                                            sx={{ mb: 1.5 }}
                                        />

                                        <TypeSelect
                                            selectedAnimals={types}
                                            setSelectedAnimals={setTypes}
                                            Categories={Categories}
                                        ></TypeSelect>

                                        <DatePicker
                                            label="วันที่ค้นพบ"
                                            value={foundDate}
                                            onChange={(e) => setFoundDate(e)}
                                            sx={{ mb: 1.5 }}
                                        />
                                        <DatePicker
                                            label="สูญพันธุ์"
                                            value={extinctionDate}
                                            onChange={(e) => setExtinctionDate(e)}
                                            sx={{ mb: 1.5 }}
                                        />

                                        <Box
                                            sx={{ my: 1 }}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const image = e.target.files ? e.target.files[0] : null
                                                    setImage(image);
                                                    setDisplayImage(e.target.value);
                                                    if (image) {
                                                        setDisplayImage(URL.createObjectURL(image));
                                                    }
                                                }}
                                            />


                                        </Box>
                                        <RichText
                                            value={description}
                                            setValue={setDescription}
                                        />


                                        <Box sx={{ my: 1 }}>
                                            <Warning id="animal_dialog"></Warning>
                                        </Box>
                                    </FormControl>
                                ) : (
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress />
                                    </Box>
                                )
                            }
                        </DialogContentText>
                    </Grid>
                    <Grid item md={6}>
                        <Box sx={{ mb: 1.5 }}>
                            {displayImage ? (
                                <Box
                                    sx={{
                                        overflow: 'hidden',
                                        height: "sm",
                                        width: "100%",
                                        textAlign: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <img
                                        src={displayImage}
                                        alt="รูปภาพประกอบ"
                                        style={{
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                </Box>
                            ) : (null)}
                        </Box>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setState(false)}>ปิด</Button>
                <Button onClick={() => action == "insert" ? InsertData() : EditData()}>ยืนยัน</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Index;
