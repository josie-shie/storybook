import Image from 'next/image';
import handicapTopBar from './img/handicapTopBar.png';
import handicapBottomTable from './img/handicapBottomTable.png';
import handicapTop from './img/handicapTop.png';
import style from './tutorial.module.scss';
import HandIcon from './img/hand.svg';
import HandicapTopDescription from './img/handicapTopDescription.png';
import HandicapBottomDescription from './img/handicapBottomDescription.png';
import HighlightHandIcon from './img/highlightHand.svg';

function Handicap({ isShowed }: { isShowed: Record<number, number> }) {
    return (
        <div className={style.images}>
            <div className={style.tutorialTop} style={{ top: '30px' }}>
                <Image
                    alt=""
                    height={32}
                    width={193}
                    src={handicapTop.src}
                    style={{ objectFit: 'contain' }}
                />
                <Image
                    alt=""
                    height={246}
                    width={330}
                    src={handicapTopBar.src}
                    className={`${style.highlightImage} ${
                        isShowed[0] <= 0 && style.handicapAnimation
                    }`}
                />
                <HandIcon style={{ position: 'absolute', top: '246px', left: '70px' }} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        marginTop: '2px',
                        marginRight: '20px'
                    }}
                >
                    <Image
                        alt=""
                        height={56}
                        width={122}
                        src={HandicapTopDescription.src}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
            <div className={style.tutorialBottom}>
                <div style={{ display: 'relative' }}>
                    <Image
                        alt=""
                        height={66}
                        width={114}
                        src={handicapBottomTable.src}
                        style={{ objectFit: 'contain' }}
                    />
                    <HighlightHandIcon
                        style={{ position: 'absolute', top: '36px', left: '82px' }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'right'
                    }}
                >
                    <Image
                        alt=""
                        height={56}
                        width={122}
                        src={HandicapBottomDescription.src}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Handicap;
