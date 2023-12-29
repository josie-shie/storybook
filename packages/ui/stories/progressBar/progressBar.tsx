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
     * Bar height
     */
    height?: number;
    /**
     * Background color
     */
    background?: string;
    /**
     * Does the ProgressBar have border radius
     */
    radius?: boolean;
    /**
     * Gap size setting
     */
    gapSize?: 'small' | 'medium' | 'large';
    /**
     * Is the gap skew
     */
    skewGap?: boolean;
}

const sizeMap = { small: '2px', medium: '4px', large: '8px' };

function ProgressBar(props: PropType) {
    const {
        fill,
        background,
        radius,
        skewGap,
        value = 50,
        height = 10,
        gapSize = 'medium'
    } = props;
    const percent = value < 0 || value > 100 ? 50 : 100 - value;
    const barHeight = height < 0 || height > 50 ? 10 : height;
    const gapWidth = sizeMap[gapSize];

    return (
        <div
            className={`ui-progressBar ${style.progressBar}`}
            style={{
                height: `${barHeight}px`,
                borderRadius: `${radius ? '100px' : '0'}`
            }}
        >
            <span
                className={style.left}
                style={{
                    transform: `translateX(-${percent}%) ${skewGap ? 'skew(-20deg)' : ''}`
                }}
            >
                <span className={style.leftContent} style={{ background: fill }} />
                {value !== 100 && <span className={style.gap} style={{ width: gapWidth }} />}
            </span>
            <span
                className={style.right}
                style={{
                    background,
                    transform: `translateX(${value}%) ${skewGap ? 'skew(-20deg)' : ''}`
                }}
            />
        </div>
    );
}

export { ProgressBar };
