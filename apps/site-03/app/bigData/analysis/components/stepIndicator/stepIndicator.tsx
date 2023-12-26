import style from './stepIndicator.module.scss';

function StepIndicator({ stepNumber, text }: { stepNumber: string; text: string }) {
    return (
        <div className={style.step}>
            <span className={style.stepNumber}>
                <span className={style.number}>{stepNumber}</span>
                <span className={style.text}>{text}</span>
            </span>
        </div>
    );
}

export default StepIndicator;
