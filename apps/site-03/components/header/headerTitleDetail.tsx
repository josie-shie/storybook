import { useRouter } from 'next/navigation';
import Image from 'next/image';
import style from './header.module.scss';
import backLeftArrowImg from './img/backLeftArrow.png';

interface HeaderProps {
    title: string;
}

function HeaderTitle({ title }: HeaderProps) {
    const router = useRouter();

    return (
        <div className={style.placeholder}>
            <div className={style.headerDetail}>
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
            </div>
        </div>
    );
}

export default HeaderTitle;
