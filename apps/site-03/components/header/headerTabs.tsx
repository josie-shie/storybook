import type { ReactElement } from 'react';
import Image from 'next/image';
import Switch from './components/switch/switch';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import logoIconImg from './img/logoIcon.png';
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
                    <Image alt="" height={24} src={logoIconImg} width={24} />
                    <div className={style.icon}>{logo}</div>
                </div>
                <Switch sports={tabList} />
                <Profile total={total} />
            </div>
        </div>
    );
}

export default HeaderComponent;
