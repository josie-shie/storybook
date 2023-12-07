import Image from 'next/image';
import Switch from './components/switch/switch';
import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import logoIconImg from './img/logoIcon.png';
import Profile from './components/profile/profile';
import Notice from './components/notice/notice';
import Logo from './img/logo.png';

interface HeaderProps {
    tabList: string[];
}

function HeaderComponent({ tabList }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <div className={style.logo}>
                    <Image alt="" height={24} src={logoIconImg} width={24} />
                    <div className={style.icon}>
                        <Image alt="logo" src={Logo} width={66} />
                    </div>
                </div>
                <Switch sports={tabList} />
                <div className={style.userOption}>
                    <Notice />
                    <Profile />
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
