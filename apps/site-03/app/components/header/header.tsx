import Image from 'next/image';
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
                    <Image alt="" src={LogoIcon as string} />
                    <Image alt="" src={Logo as string} />
                </div>
                <div className={style.total}>
                    <Image alt="" className={style.icon} src={TotalIcon as string} />
                    <div className={style.totalNumber}>999,999</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
