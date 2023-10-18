import HeaderBg from './img/HeaderBg.png';
import TotalIcon from './img/TotalIcon.svg';
import style from './header.module.scss';
import LogoIcon from './img/LogoIcon.svg';
import Logo from './img/Logo.svg';

function HeaderComponent() {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${HeaderBg.src})` }}>
                <div className={style.logo}>
                    <LogoIcon />
                    <Logo />
                </div>
                <div className={style.total}>
                    <TotalIcon className={style.icon} />
                    <div className={style.totalNumber}>999,999</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
