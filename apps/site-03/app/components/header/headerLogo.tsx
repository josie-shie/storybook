import dotBackground from './img/dotBackground.png';
import style from './header.module.scss';
import LogoIcon from './img/logoIcon.svg';
import Logo from './img/logo.svg';
import Profile from './components/profile/profile';

interface HeaderProps {
    total: number;
}

function HeaderLogo({ total }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${dotBackground.src})` }}>
                <div className={style.logo}>
                    <LogoIcon />
                    <Logo />
                </div>
                <Profile total={total} />
            </div>
        </div>
    );
}

export default HeaderLogo;
