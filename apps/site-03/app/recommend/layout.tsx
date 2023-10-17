import type { ReactNode } from 'react';
import Image from 'next/image';
import User from './img/user.png';
import Star from './img/star.png';
import style from './recommend.module.scss';

function RecommendLayout({ children }: { children: ReactNode }) {
    return (
        <div className={style.recommend}>
            <header className={style.header}>
                <div className={style.left}>
                    <Image alt="" src={User} />
                </div>
                <div className={style.switch}>
                    <span>足球</span>
                    <span>籃球</span>
                </div>
                <div className={style.star}>
                    <Image alt="" src={Star} />
                    <span className={style.number}>999,999</span>
                </div>
            </header>
            <div>{children}</div>
        </div>
    );
}

export default RecommendLayout;
