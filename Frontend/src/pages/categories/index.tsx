import { useEffect, useState } from 'react';
import { useInterfaceContext } from '../../context/InterfaceContext';
import { useQuery, useMutation } from 'react-query';
import { useAuthContext } from '../../context/AuthContext';
import Element, { DialogData } from './element';
import axios from '../../api/axios';


export interface Category {
    id: number,
    title: string,
    created_at: string
}

export const FetchCategories = async () => {
    return await axios.get("/api/categories");
}

export default function Index() {
    const [Categories, setCategories] = useState<Category[]>([]);
    const [DialogState, setDialogState] = useState<boolean>(false);
    const { Backdrop: { setBackdrop }, Warning: { useWarning } } = useInterfaceContext();
    const { setErrors} = useAuthContext();
    const { data, error, isLoading, refetch } = useQuery("Categories", FetchCategories)

    useEffect(() => {
        if (data) setCategories(data.data);
    }, [data]);

    const SwitchBackdrop = (state: boolean) => {
        setBackdrop(state)
        setDialogState(!state)
    }

    const insert = useMutation(async (data: DialogData) => {
        SwitchBackdrop(true)

        return await axios.post('/api/categories', {
            title: data.title
        }).then(() => {
            setBackdrop(false);
            refetch()
            useWarning(`เพิ่มประเภท "${data.title}" สำเร็จแล้ว!`); 
        }).catch((e) => {
            if (e.response.status === 422) {
                setErrors(e.response.data)
            }else{
                useWarning(`เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!`, 'error', 'category_dialog'); 
            };

            SwitchBackdrop(false);
        })
    });

    const del = useMutation(async (data: DialogData) => {
        const defaultTitle = Categories.find(item => item.id == data.id)?.title;
        SwitchBackdrop(true)

        return await axios.delete(`/api/categories/${data.id}`)
            .then(() => {
                useWarning(`ลบประเภท "${defaultTitle}" สำเร็จแล้ว!`)
                refetch()
            }).catch(() => {
                useWarning(`เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!`, 'error');
            }).finally(() => {
                setBackdrop(false);
            })
    });

    const edit = useMutation(async (data: DialogData) => {
        const defaultTitle = Categories.find(item => item.id == data.id)?.title;
        const updateTitle = data.title;
        SwitchBackdrop(true)

        return await axios.patch(`/api/categories/${data.id}`, {
            title: data.title
        }).then(() => {
            setBackdrop(false);
            useWarning(`แก้ไขประเภท "${defaultTitle}" ไปเป็น "${updateTitle}" สำเร็จแล้ว!`);

            refetch()
        }).catch((e) => {
            if (e.response.status === 422) {
                setErrors(e.response.data)
            }else{
                useWarning(`เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!`, 'error', 'category_dialog'); 
            };

            SwitchBackdrop(false);
        })
    });


    if (error) {
        return (
            <p>ERROR LOADING</p>
        )
    }

    return <Element
        Categories={Categories}
        insert={insert.mutateAsync}
        del={del.mutateAsync}
        edit={edit.mutateAsync}
        isLoading={isLoading}
        DialogState={DialogState}
        setDialogState={setDialogState}
    />
}