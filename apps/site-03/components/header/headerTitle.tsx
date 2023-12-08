import { useRouter } from 'next/navigation';
import Image from 'next/image';
import pureBackground from './img/pureBackground.png';
import style from './header.module.scss';
import backLeftArrowImg from './img/backLeftArrow.png';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';
import { useUserStore } from '@/app/userStore';

interface HeaderProps {
    title: string;
}

function HeaderTitle({ title }: HeaderProps) {
    const userInfoIsLoading = useUserStore.use.userInfoIsLoading();
    const router = useRouter();

    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${pureBackground.src})` }}>
                <div className={style.title}>
                    <Image
                        alt=""
                        height={24}
                        onClick={() => {
                            router.back();
                        }}
                        src={backLeftArrowImg}
                        width={24}
                    />
                    <div className={style.text}>{title}</div>
                </div>
                {!userInfoIsLoading && (
                    <div className={style.userOption}>
                        <Notice />
                        <Profile />
                    </div>
                )}
            </div>
        </div>
    );
}

export default HeaderTitle;
