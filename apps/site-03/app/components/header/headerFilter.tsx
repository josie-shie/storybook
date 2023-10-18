import HeaderBg from './img/headerBg.png';
import TotalIcon from './img/totalIcon.svg';
import style from './header.module.scss';
import LogoIcon from './img/logoIcon.svg';
import Logo from './img/logo.svg';

function HeaderComponent() {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${HeaderBg.src})` }}>
                <div className={style.logo}>
                    <LogoIcon />
                    <Logo />
                </div>
                <div className={style.total}>
                    <TotalIcon />
                    <div className={style.totalNumber}>999,999</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
