import type { ReactNode } from 'react';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import LogoIcon from './img/logoIcon.svg';
import Profile from './components/profile/profile';

interface HeaderProps {
    logo?: ReactNode;
    total: number;
}

function HeaderLogo({ total, logo }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <div className={style.logo}>
                    <LogoIcon />
                    <div className={style.icon}>{logo}</div>
                </div>
                <Profile total={total} />
            </div>
        </div>
    );
}

export default HeaderLogo;
