import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Chip, DialogTitle, DialogContentText, DialogActions, Button, Typography, Divider } from '@mui/material';
import { Animal } from '..';
import { FormatThai } from '../../../utils/date';
import { useQuery } from 'react-query';
import { FetchCategories } from '../../categories';

interface AnimalDetailViewProps {
    open: boolean;
    onClose: () => void;
    animal: Animal;
}

const AnimalDetailView: React.FC<AnimalDetailViewProps> = ({ open, onClose, animal }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const { isLoading, error, data } = useQuery("categories", FetchCategories);
    const CategoriesUncode = JSON.parse(animal.categories)

    useEffect(() => {
        if (data?.data) {
            const prefer = data.data
                .filter(({ id }: { id: number }) => CategoriesUncode.includes(id))
                .map(({ title }: { title: string }) => title);

            setCategories(prefer);
        }
    }, [data]);

    return (
        <Dialog
            maxWidth='md'
            fullWidth
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{animal.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        dangerouslySetInnerHTML={{ __html: animal.detail }}
                    >
                    </Typography>
                </DialogContentText>
                <Divider style={{
                    margin: "1em 0em"
                }}></Divider>
                <Typography style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <p><b>ประเภท : </b><span>
                        {
                            !isLoading ? (
                                !error ? (
                                    categories.map((category, index) => {
                                        return <Chip key={index} label={category} sx={{ mx: 0.4 }}></Chip>
                                    })
                                ) : (`ERROR DATA`)
                            ) : ("Loading...")
                        }
                    </span></p>
                    <p><b>วันที่ค้นพบ : </b><span>{FormatThai(new Date(animal.found))}</span></p>
                    {!animal.extinction ? null : (
                        <p><b>วันที่สูญพันธุ์ : </b><span>{FormatThai(new Date(animal.extinction))}</span></p>
                    )}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>ปิด</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnimalDetailView;
