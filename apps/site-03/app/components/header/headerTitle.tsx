import pureBackground from './img/pureBackground.png';
import style from './header.module.scss';
import BackLeftArrow from './img/backLeftArrow.svg';
import Profile from './components/profile/profile';

interface HeaderProps {
    title: string;
    total: number;
}

function HeaderTitle({ title, total }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.header} style={{ backgroundImage: `url(${pureBackground.src})` }}>
                <div className={style.title}>
                    <BackLeftArrow />
                    <div className={style.text}>{title}</div>
                </div>
                <Profile total={total} />
            </div>
        </div>
    );
}

export default HeaderTitle;
