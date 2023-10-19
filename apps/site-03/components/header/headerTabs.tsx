import type { ReactElement } from 'react';
import Switch from './components/switch/switch';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import LogoIcon from './img/logoIcon.svg';
import Profile from './components/profile/profile';

interface HeaderProps {
    logo?: ReactElement;
    tabList: string[];
    total: number;
}

function HeaderComponent({ logo, tabList, total }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <div className={style.logo}>
                    <LogoIcon />
                    {logo}
                </div>
                <Switch sports={tabList} />
                <Profile total={total} />
            </div>
        </div>
    );
}

export default HeaderComponent;
