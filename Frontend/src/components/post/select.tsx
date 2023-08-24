import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import { Category } from '../../pages/categories';

interface MyComponentProps {
    selectedAnimals: string[];
    setSelectedAnimals: React.Dispatch<React.SetStateAction<string[]>>;
    Categories: Category[];
}

function MyComponent({ selectedAnimals, setSelectedAnimals, Categories }: MyComponentProps) {
    const handleAnimalChange = (event: any) => {
        setSelectedAnimals(event.target.value as string[]);
    };

    return (
        <FormControl fullWidth sx={{ mb: 1.5 }}>
            <InputLabel id="select-animal-type">ประเภทของสัตว์</InputLabel>
            <Select
                labelId="select-animal-type"
                id="animal-type"
                label="ประเภทของสัตว์"
                multiple
                value={selectedAnimals}
                onChange={handleAnimalChange}
                renderValue={(selected) => (
                    <div>
                        {selected.map((value) => {
                            const category = Categories.find((cat) => cat.id.toString() === value.toString());
                            return (
                                <Chip key={value} label={category ? category.title : ''} sx={{ m: 0.5 }} />
                            );
                        })}
                    </div>
                )}
            >
                {Categories.map((Category) => (
                    <MenuItem key={Category.id} value={Category.id}>
                        {Category.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MyComponent;
