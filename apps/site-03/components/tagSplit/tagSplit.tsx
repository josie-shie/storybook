import style from './tagSplit.module.scss';

interface PropsType {
    text?: string;
    number: number;
    isBlueBg: boolean;
}

function TagSplit({ text, number, isBlueBg }: PropsType) {
    const borderColor = () => {
        if (isBlueBg) {
            return 'linear-gradient(89.8deg, rgba(255, 255, 255, 0.2) -0.86%, rgba(255, 255, 255, 0.65) 99.82%),linear-gradient(90deg, #609BFF 0%, #0157E9 100%)';
        }
        return 'linear-gradient(90deg, #609bff 0%, #0157e9 100%)';
    };

    const leftColor = () => {
        if (isBlueBg) {
            return 'linear-gradient(90deg, #609BFF 0%, #0157E9 100%),linear-gradient(90deg, #6CA2FF 0%, #1362E9 100%),linear-gradient(0deg, #F2F7FF, #F2F7FF),linear-gradient(89.8deg, rgba(255, 255, 255, 0.2) -0.86%, rgba(255, 255, 255, 0.65) 99.82%),linear-gradient(0deg, #FFFFFF, #FFFFFF)';
        }
        return 'linear-gradient(90deg, #609BFF 0%, #0157E9 105.82%),linear-gradient(0deg, #D9D9D9, #D9D9D9)';
    };

    return (
        <div className={style.tagLayout} style={{ background: borderColor() }}>
            <div className={style.tagLeft} style={{ background: leftColor() }}>
                {text}
            </div>
            <div className={style.tagRight}>
                榜<span className={style.tagNumber}>{number}</span>
            </div>
        </div>
    );
}

export default TagSplit;
