import Image from 'next/image';
import style from './header.module.scss';
import backLeftArrowImg from './img/backLeftArrow.png';

interface HeaderProps {
    title: string;
    back: () => void;
}

function HeaderTitle({ title, back }: HeaderProps) {
    return (
        <div className={style.placeholder}>
            <div className={style.headerDetail}>
                <div className={style.title}>
                    <Image alt="" height={24} onClick={back} src={backLeftArrowImg} width={24} />
                    <div className={style.text}>{title}</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderTitle;
