import { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Tooltip } from '@mui/material';
import {
    Favorite as FavoriteIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    CircleOutlined,
    Delete
} from '@mui/icons-material';

import AnimalPopup from './popup';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios, { url } from '../../../api/axios';
import { useMutation, useQueryClient } from 'react-query';
import { Animal } from '../index';
import EditDialog from '../../../components/post/dialog';
import dayjs from 'dayjs';
import Confirmation from '../../../components/confirmation';
import { useInterfaceContext } from '../../../context/InterfaceContext';

const AnimalCard: React.FC<Animal> = (props) => {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isLiked, setLike] = useState<boolean>(props.like_id != null);
    const [Likes] = useState<number>(isLiked ? props.likes - 1 : props.likes);
    const [LikeId, setLikeId] = useState<number | null>(props.like_id);
    const [isEdit, setEditState] = useState<boolean>(false);
    const [deleteState, setDeleteState] = useState<boolean>(false);
    const { Backdrop: { setBackdrop }, Warning: { useWarning } } = useInterfaceContext();
    const queryClient = useQueryClient();

    const { isLogged, isAdmin } = useAuthContext();
    const navigate = useNavigate();

    const togglePopup = () => {
        setPopupOpen(!popupOpen);
    };

    const { mutate: MutateLike, isLoading: LikeLoading } = useMutation(async (data: { id: number }) => {
        setLikeId(null);
        return await axios.post("/api/likes", data)
            .then(({ data }) => {
                setLikeId(data.likeId || null)
            })
            .catch(() => {
                setLike(false);
            })
    })

    const { mutate: MutateUnLike, isLoading: unLikeLoading } = useMutation(async () => {
        return await axios.delete(`/api/likes/${LikeId}`)
            .then(() => {
                setLikeId(null)
            }).catch(() => {
                setLikeId(props.like_id);
                setLike(true);
            })
    })

    const { mutate: MutateDelete } = useMutation(async (ID: number) => {
        setDeleteState(false);
        setBackdrop(true);
        return await axios.delete(`/api/animals/${ID}`)
            .then(() => {
                useWarning(`คุณได้ลบโพสต์แล้ว!`);
                queryClient.invalidateQueries('Feed');
            }).catch(() => {
                useWarning(`เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!`, 'error')
            }).finally(() => {
                setBackdrop(false);
            })
    })

    const onLike = () => {
        if (!isLogged()) return navigate('/signin')
        setLike(!isLiked)
        return (!isLiked) == false ? MutateUnLike() : MutateLike({ id: props.id })
    }

    return (
        <>
            <Card
                style={{
                    marginTop: '1em',
                }}
            >
                <CardHeader title={props.name} />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    
                        dangerouslySetInnerHTML={
                            { 
                                __html: props.detail.length > 300
                                ? props.detail.substring(0, 300) + "..."
                                : props.detail
                            }
                        }
                    >
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="auto" // Let the image adjust its height automatically
                    width="100%" // Make sure the image takes up the full width of the Card
                    image={`${url}/storage/images/${props.image}`}
                    alt={props.name}
                />
                <CardActions disableSpacing style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>
                        <Tooltip title={!isLogged() ? "จำเป็นต้องลงชื่อเข้าใช้สำหรับการกดไลค์!" : "ไลค์"}>
                            {(LikeLoading || unLikeLoading) ? (
                                <IconButton>
                                    <CircleOutlined />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label={!isLogged() ? "จำเป็นต้องลงชื่อเข้าใช้สำหรับการกดไลค์!" : "ไลค์"}
                                    onClick={onLike}
                                    color={isLiked ? 'primary' : "default"}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            )}
                        </Tooltip>
                        <Tooltip title="รายละเอียดเพิ่มเติม">
                            <IconButton
                                aria-label="รายละเอียดเพิ่มเติม"
                                onClick={togglePopup}
                                color={popupOpen ? 'primary' : "default"}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        {
                            isAdmin() ? (
                                <>
                                    <EditDialog
                                        State={isEdit}
                                        setState={setEditState}
                                        default={{
                                            id: props.id,
                                            title: "แก้ไขสัตว์",
                                            name: props.name,
                                            types: JSON.parse(props.categories),
                                            description: props.detail,
                                            foundDate: dayjs(props.found),
                                            extinctionDate: props.extinction ? (dayjs(props.extinction)) : null,
                                            image: `${url}/storage/images/${props.image}`,
                                            action: "edit"
                                        }}
                                    />
                                    <Tooltip title="แก้ไข">
                                        <IconButton
                                            aria-label="แก้ไข"
                                            onClick={() => setEditState(true)}
                                        >
                                            <EditIcon></EditIcon>
                                        </IconButton>
                                    </Tooltip>
                                    <Confirmation
                                        state={deleteState}
                                        setState={setDeleteState}
                                        title='แจ้งเตือน'
                                        text={`คุณต้องการที่จะลบ "${props.name}" หรือไม่?`}
                                        confirm={() => {
                                            MutateDelete(props.id)
                                        }}
                                    ></Confirmation>
                                    <Tooltip title="ลบ">
                                        <IconButton
                                            aria-label="ลบ"
                                            onClick={() => setDeleteState(true)}
                                        >
                                            <Delete></Delete>
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ): null
                        }
                    </div>
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            {(isLiked) ? (Likes + 1) : (Likes)} ไลค์
                        </Typography>
                    </div>
                </CardActions>
            </Card>
            <AnimalPopup open={popupOpen} onClose={togglePopup} animal={props} />
        </>
    )
};

export default AnimalCard;
