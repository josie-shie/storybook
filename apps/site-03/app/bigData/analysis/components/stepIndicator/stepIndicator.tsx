import style from './stepIndicator.module.scss';

function StepIndicator({
    stepNumber,
    text,
    subText
}: {
    stepNumber: string;
    text: string;
    subText?: string;
}) {
    return (
        <div className={style.step}>
            <span className={style.stepNumber}>
                <span className={style.number}>{stepNumber}</span>
                <span className={style.text}>
                    {text}
                    <span className={style.subText}>{subText}</span>
                </span>
            </span>
        </div>
    );
}

export default StepIndicator;
