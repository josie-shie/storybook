import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import pureBackground from './img/pureBackground.png';
import backLeftArrowImg from './img/backLeftArrow.png';
import style from './header.module.scss';

interface HeaderProps {
    title: string;
    children?: ReactNode;
}

function HeaderComponent({ title, children }: HeaderProps) {
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
                {children}
            </div>
        </div>
    );
}

export default HeaderComponent;
