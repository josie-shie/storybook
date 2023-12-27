'use client';
import Image from 'next/image';
import Link from 'next/link';
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
import enoughTitle from './img/enoughTitle.png';
import enoughText from './img/enoughText.png';
import vipTip from './img/vipTip.png';
import style from './animationData.module.scss';

interface TestProps {
    analysisTime: boolean;
    onUpdateAnalysis: (newTestValue: boolean) => void;
}

function AnimationData({ analysisTime, onUpdateAnalysis }: TestProps) {
    const handleConfirm = () => {
        onUpdateAnalysis(true);
    };

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
            <div className={style.banner}>
                {analysisTime ? (
                    <div className={style.animate}>
                        <div className={`${style.top} ${style.animated} ${style.fadeInLeft}`}>
                            <Image alt="data" src={dataText} />
                        </div>

                        <div className={`${style.bottom} ${style.animated} ${style.fadeInRight}`}>
                            <Image alt="data" src={blueText} />
                        </div>
                    </div>
                ) : (
                    <div className={style.enough}>
                        <div className={style.column}>
                            <Image alt="title" height={19} src={enoughTitle} width={145} />
                            <Image alt="title" height={34} src={enoughText} width={258} />
                            <Link className={style.goVip} href="/userInfo/subscribe">
                                <Image
                                    alt="title"
                                    className={style.tip}
                                    height={14}
                                    src={vipTip}
                                    width={40}
                                />
                                升级VIP 无限使用
                            </Link>
                            <Link
                                className={style.goSingle}
                                href=""
                                onClick={() => {
                                    handleConfirm();
                                }}
                            >
                                單次分析 80$
                            </Link>
                        </div>
                    </div>
                )}

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
