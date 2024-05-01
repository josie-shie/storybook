'use client';
import Button from '@mui/material/Button';
import Header from '@/components/header/headerLogo';
import { useMessageStore } from '@/store/messageStore';
import style from './header.module.scss';
import { useNoticeStore } from './noticeStore';
import TrashIcon from './img/trash.svg';

function HeaderBar() {
    const setEditStatus = useNoticeStore.use.setEditStatus();
    const editStatus = useNoticeStore.use.editStatus();
    const setSelected = useNoticeStore.use.setSelected();
    const unreadMessageNotify = useMessageStore.use.unreadMessageNotify();
    const updateUnreadMessageNotify = useMessageStore.use.updateUnreadMessageNotify();

    const handleClickEdit = () => {
        if (editStatus) {
            setEditStatus(false);
            setSelected(0, 'clear');
        } else {
            setEditStatus(true);
        }
    };
    const onClickBack = () => {
        updateUnreadMessageNotify({
            ...unreadMessageNotify,
            mailCount: 0,
            totalCount: unreadMessageNotify.chatCount
        });
    };
    return (
        <Header back onClickBack={onClickBack} title="消息中心">
            <div className={style.edit}>
                <TrashIcon />
                <Button
                    className={style.editBtn}
                    onClick={handleClickEdit}
                    size="small"
                    variant="text"
                >
                    {editStatus ? '取消' : '编辑'}
                </Button>
            </div>
        </Header>
    );
}

export default HeaderBar;
