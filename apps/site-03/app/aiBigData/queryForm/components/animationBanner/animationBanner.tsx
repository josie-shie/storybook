import style from './animationBanner.module.scss';
import DataText from './img/dataText.svg';
import BlueText from './img/blueText.svg';
import AnimationLine1 from './img/animationLine1.svg';
import AnimationLine2 from './img/animationLine2.svg';
import AnimationLine3 from './img/animationLine3.svg';
import AnimationLine4 from './img/animationLine4.svg';
import AnimationLine5 from './img/animationLine5.svg';
import AnimationLine6 from './img/animationLine6.svg';
import AnimationLine7 from './img/animationLine7.svg';

function QueryFormLayout() {
    const animateLinesLeft = [
        <AnimationLine1 key={1} />,
        <AnimationLine2 key={2} />,
        <AnimationLine3 key={3} />,
        <AnimationLine4 key={4} />
    ];

    const animateLinesRight = [
        <AnimationLine5 key={5} />,
        <AnimationLine6 key={6} />,
        <AnimationLine7 key={7} />
    ];

    return (
        <div className={style.animationBanner}>
            <div className={style.banner}>
                <div className={style.animate}>
                    <div className={`${style.animated} ${style.fadeInLeft}`}>
                        <DataText />
                    </div>

                    <div className={`${style.bottom} ${style.animated} ${style.fadeInRight}`}>
                        <BlueText />
                    </div>
                </div>

                <div className={`${style.animateLine}`}>
                    <div className={style.scaleUpLeft}>
                        {animateLinesLeft.map((line, index) => (
                            <span key={`animationLeft_${index.toString()}`}>{line}</span>
                        ))}
                    </div>
                    <div className={style.scaleUpRight}>
                        {animateLinesRight.map((line, index) => (
                            <span key={`animationRight_${index.toString()}`}>{line}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QueryFormLayout;
