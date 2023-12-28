import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import pureBackground from './img/pureBackground.png';
import backLeftArrowImg from './img/backLeftArrow.png';
import style from './header.module.scss';

interface HeaderProps {
    title: string;
    background?: boolean;
    children?: ReactNode;
    backHandler?: () => void;
}

function HeaderComponent({ title, background = false, children, backHandler }: HeaderProps) {
    const router = useRouter();

    const handleBackClick = () => {
        if (backHandler) {
            backHandler();
        } else {
            router.back();
        }
    };

    const headerStyle = background
        ? {
              background: 'linear-gradient(to right, #194fa8 0%,#3981fa 100%)'
          }
        : {
              backgroundImage: `url(${pureBackground.src})`
          };

    return (
        <div className={style.placeholder}>
            <div className={style.header} style={headerStyle}>
                <div className={style.title}>
                    <Image
                        alt=""
                        height={24}
                        onClick={handleBackClick}
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
