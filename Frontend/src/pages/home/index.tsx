import Container from '@mui/material/Container'
import AnimalPost from './components/animal'
import AddPost from '../../components/post/addpost'

import Warning from '../../components/warning'
import { Box, CircularProgress } from '@mui/material'
import { useQuery } from 'react-query';
import axios from '../../api/axios'
import { useEffect, useState } from 'react'

const fetchAnimals = async () => {
    return await axios.get("/api/animals").catch((e) => console.log("FETCH", e));
}

export interface Animal {
    id: number,
    categories: string,
    detail: string,
    image: string,
    name: string,
    found: Date,
    extinction: Date | null,
    created_at: Date,

    likes: number,
    like_id: number | null
}

export default function iAnimal() {
    const [Animals, setAnimals] = useState<Animal[]>([]);
    const { isLoading, error, data } = useQuery("Feed", fetchAnimals);

    useEffect(() => {
        if (data?.data) {
            setAnimals(data.data);
        }
    }, [data])

    if (error) {
        return <p>ERROR</p>
    }

    return (
        <>
            <AddPost></AddPost>
            <Container maxWidth="sm"> {/* Use a maxWidth to control the card's width */}
                {isLoading ? (
                    <Box sx={{
                        my: 5,
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ mt: 1 }}>
                            <Warning></Warning>
                        </Box>

                        {Animals.map((Animal) => {
                            return (
                                <AnimalPost
                                    key={Animal.id}
                                    {...Animal}
                                />
                            )
                        })}
                    </>
                )}
            </Container >
        </>
    );
}
