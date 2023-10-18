import type { ReactElement } from 'react';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import LogoIcon from './img/logoIcon.svg';
import Profile from './components/profile/profile';

interface Tab {
    label: string;
    value: string;
}

interface HeaderProps {
    logo: ReactElement | string;
    tabList: Tab[];
    total: number;
}

function HeaderComponent({ logo, tabList, total }: HeaderProps) {
    tabList;

    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <div className={style.logo}>
                    <LogoIcon />
                    {logo}
                </div>
                <Profile total={total} />
            </div>
        </div>
    );
}

export default HeaderComponent;
