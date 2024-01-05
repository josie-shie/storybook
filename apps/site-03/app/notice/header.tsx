'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import HeaderOption from '@/components/header/headerTitleFilter';
import style from './header.module.scss';
import { useNoticeStore } from './noticeStore';

function HeaderBar() {
    const router = useRouter();
    const setEditStatus = useNoticeStore.use.setEditStatus();
    const editStatus = useNoticeStore.use.editStatus();
    const setSelected = useNoticeStore.use.setSelected();

    const handleClickEdit = () => {
        if (editStatus) {
            setEditStatus(false);
            setSelected(0, 'clear');
        } else {
            setEditStatus(true);
        }
    };

    const backHandler = () => {
        router.push('/');
    };

    return (
        <HeaderOption backHandler={backHandler} title="消息中心">
            <Button
                className={style.editBtn}
                onClick={handleClickEdit}
                size="small"
                variant="outlined"
            >
                {editStatus ? '取消' : '编辑'}
            </Button>
        </HeaderOption>
    );
}

export default HeaderBar;
