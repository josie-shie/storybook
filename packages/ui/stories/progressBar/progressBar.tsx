import style from './progressBar.module.scss';

interface PropType {
    /**
     * From left to right fill percentage
     */
    value?: number;
    /**
     * Fill color
     */
    fill?: string;
    /**
     * Background color
     */
    background?: string;
}

function ProgressBar(props: PropType) {
    const { fill, background, value = 50 } = props;
    const percent = value < 0 || value > 100 ? 50 : 100 - value;

    return (
        <span className={style.progressBar} style={{ background }}>
            <span
                className={style.fillPercentage}
                style={{ background: fill, transform: `translateX(-${percent}%)` }}
            />
        </span>
    );
}

export { ProgressBar };
