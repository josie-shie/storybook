import Image from 'next/image';
import Link from 'next/link';
import Badge from '@mui/material/Badge';
import { useUserStore } from '@/store/userStore';
// import { useMessageStore } from '@/app/messageStore';
import NoticeIcon from '../../img/notice.png';
import style from './notice.module.scss';

function Notice() {
    // const unreadMessageNotify = useMessageStore.use.unreadMessageNotify();
    // const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    return (
        <>
            {isLogin ? (
                <Link className={style.notice} href="/notice">
                    <Badge badgeContent={0} color="primary">
                        {/* <Badge badgeContent={unreadMessageNotify.totalCount} color="primary"> */}
                        <Image
                            alt="notice"
                            className={style.icon}
                            height={28}
                            src={NoticeIcon}
                            width={28}
                        />
                    </Badge>
                </Link>
            ) : null}
        </>
    );
}

export default Notice;
