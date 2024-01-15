import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import pureBackground from './img/pureBackground.png';
import style from './header.module.scss';
import backLeftArrowImg from './img/backLeftArrow.png';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';

interface HeaderProps {
    title: string;
    back: () => void;
}

function HeaderTitle({ title, back }: HeaderProps) {
    const userInfoIsLoading = useUserStore.use.userInfoIsLoading();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${pureBackground.src})` }}>
                <div className={style.title}>
                    <Image alt="" height={24} onClick={back} src={backLeftArrowImg} width={24} />
                    <div className={style.text}>{title}</div>
                </div>
                {mounted && !userInfoIsLoading ? (
                    <div className={style.userOption}>
                        <Notice />
                        <Profile />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default HeaderTitle;
