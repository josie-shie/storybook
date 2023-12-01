'use client';

import Button from '@mui/material/Button';
import Image from 'next/image';
import style from './header.module.scss';
import { useNoticeStore } from './noticeStore';
import LogoImg from './img/logo.png';
import dotBackground from '@/components/header/img/dotBackground.png';
import logoIconImg from '@/components/header/img/logoIcon.png';

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
        <div className={style.placeholder}>
            <div
                className={style.noticeHeader}
                style={{ backgroundImage: `url(${dotBackground.src})` }}
            >
                <div>
                    <Image alt="" height={24} src={logoIconImg} width={24} />
                    <Image alt="" height={13} src={LogoImg} width={66} />
                </div>

                <div className={style.edit}>
                    <Button
                        onClick={() => {
                            handleClickEdit();
                        }}
                        size="small"
                        variant="outlined"
                    >
                        {editStatus ? '取消' : '编辑'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeaderBar;
