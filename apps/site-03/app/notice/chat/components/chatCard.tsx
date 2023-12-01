'use client';

import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Badge from '@mui/material/Badge';
import AvatarIcon from '../img/mentorIcon.jpg';
import style from './chatCard.module.scss';
import { useNoticeStore } from '@/app/notice/noticeStore';
import Avatar from '@/components/avatar/avatar';

function ChatCard() {
    const editStatus = useNoticeStore.use.editStatus();

    return (
        <li className={`${style.chatCard}  ${editStatus && style.isEdit}`}>
            <Checkbox
                checkedIcon={<CheckCircleOutlineIcon />}
                className={style.check}
                icon={<RadioButtonUncheckedIcon />}
            />
            <div className={style.card}>
                <Badge color="error" invisible={false} variant="dot">
                    <Avatar borderColor="#FFFFFF" size={40} src={AvatarIcon.src} />
                </Badge>
                <div className={style.right}>
                    <div className={style.topBar}>
                        <div className={style.name}>梅西</div>
                        <p className={style.date}>2023/08/03</p>
                    </div>
                    <div className={style.bottomBar}>
                        <p className={style.content}>
                            尊敬的用戶，即日起使用專屬鏈結999.com註冊並完成充值就贈送500元首充禮金，名額有限，行動要快。
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ChatCard;
