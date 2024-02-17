import Link from 'next/link';
import Badge from '@mui/material/Badge';
import { useUserStore } from '@/store/userStore';
import { useMessageStore } from '@/store/messageStore';
import NoticeIcon from '../../img/notice.svg';
import style from './notice.module.scss';

function Notice() {
    const unreadMessageNotify = useMessageStore.use.unreadMessageNotify();
    // const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    return (
        <>
            {isLogin ? (
                <Link className={style.notice} href="/notice">
                    <Badge badgeContent={unreadMessageNotify.totalCount} color="primary">
                        <NoticeIcon />
                    </Badge>
                </Link>
            ) : null}
        </>
    );
}

export default Notice;
