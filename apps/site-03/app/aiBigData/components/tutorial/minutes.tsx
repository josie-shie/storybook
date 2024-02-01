import Image from 'next/image';
import style from './tutorial.module.scss';
import MinutesTopImage from './img/minutesTop.png';
import MinutesTopTable from './img/minutesTopTable.png';
import MinutesTopDescription1 from './img/minutesTopDescription1.png';
import MinutesTopDescription2 from './img/minutesTopDescription2.png';
import HighLightHand from './img/highlightHand.svg';

function Minutes({ isShowed }: { isShowed: Record<number, number> }) {
    return (
        <div className={style.images}>
            <div className={style.tutorialTop}>
                <Image
                    alt=""
                    height={32}
                    width={96}
                    src={MinutesTopImage.src}
                    style={{ objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', marginTop: '42px' }}>
                    <Image
                        alt=""
                        height={100}
                        width={130}
                        src={MinutesTopTable.src}
                        style={{ objectFit: 'contain' }}
                        className={`${style.highlightImage} ${
                            isShowed[1] <= 0 && style.minutesAnimation
                        }`}
                    />
                    <Image
                        alt=""
                        height={56}
                        width={120}
                        src={MinutesTopDescription1.src}
                        style={{ objectFit: 'contain' }}
                    />
                    <HighLightHand style={{ position: 'absolute', left: '80px', top: '150px' }} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        marginTop: '16px',
                        marginRight: '36px'
                    }}
                >
                    <Image
                        alt=""
                        height={56}
                        width={120}
                        src={MinutesTopDescription2.src}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Minutes;
