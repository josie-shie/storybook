import Image from 'next/image';
import Switch from '../switch/switch';
import User from './img/user.png';
import Star from './img/star.png';
import style from './header.module.scss';

function Header() {
    return (
        <header className={style.header}>
            <div className={style.left}>
                <Image alt="" src={User} />
            </div>
            <Switch sports={['足球', '籃球']} />
            <div className={style.star}>
                <Image alt="" src={Star} />
                <span className={style.number}>999,999</span>
            </div>
        </header>
    );
}

export default Header;
