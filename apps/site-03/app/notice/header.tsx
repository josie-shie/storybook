'use client';

import Button from '@mui/material/Button';
import style from './header.module.scss';
import { useNoticeStore } from './noticeStore';
import HeaderOption from '@/components/header/headerFilter';

function HeaderBar() {
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

    return (
        <HeaderOption>
            <Button
                className={style.editBtn}
                onClick={() => {
                    handleClickEdit();
                }}
                size="small"
                variant="outlined"
            >
                {editStatus ? '取消' : '编辑'}
            </Button>
        </HeaderOption>
    );
}

export default HeaderBar;
