import style from './tagSplit.module.scss';

interface PropsType {
    text?: string;
    number: number;
}

function TagSplit({ text, number }: PropsType) {
    return (
        <div className={style.tagLayout}>
            <div className={style.tagLeft}>{text}</div>
            <div className={style.tagRight}>
                榜<span className={style.tagNumber}>{number}</span>
            </div>
        </div>
    );
}

export default TagSplit;
