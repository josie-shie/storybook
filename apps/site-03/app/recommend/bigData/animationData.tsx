'use client';
import Link from 'next/link';
import Image from 'next/image';
import banner from './img/banner.png';
import dataText from './img/dataText.png';
import blueText from './img/blueText.png';
import animateLine1 from './img/animateLine1.png';
import animateLine2 from './img/animateLine2.png';
import animateLine3 from './img/animateLine3.png';
import animateLine4 from './img/animateLine4.png';
import animateLine5 from './img/animateLine5.png';
import animateLine6 from './img/animateLine6.png';
import animateLine7 from './img/animateLine7.png';
import animateLine8 from './img/animateLine8.png';
import animateLine9 from './img/animateLine9.png';
import style from './animationData.module.scss';

function AnimationData() {
    const animateLines = [
        animateLine1,
        animateLine2,
        animateLine3,
        animateLine4,
        animateLine5,
        animateLine6,
        animateLine7,
        animateLine8,
        animateLine9
    ];

    return (
        <div className={style.animationData}>
            <div className={style.tab}>
                <Link href="/recommend/guess">竟猜</Link>
                <Link href="/recommend/predict">专家预测</Link>
                <Link className={style.active} href="/recommend/bigData">
                    大数据分析
                </Link>
            </div>
            <div className={style.banner}>
                <Image alt="banner" src={banner} />
                <div className={style.animate}>
                    <div className={`${style.top} ${style.animated} ${style.fadeInLeft}`}>
                        <Image alt="data" src={dataText} />
                    </div>

                    <div className={`${style.bottom} ${style.animated} ${style.fadeInRight}`}>
                        <Image alt="data" src={blueText} />
                    </div>
                </div>

                <div className={`${style.animateLine} ${style.scaleUp}`}>
                    {animateLines.map((src, index) => (
                        <Image alt={`animateLine${index + 1}`} key={`${index + 1}`} src={src} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AnimationData;
