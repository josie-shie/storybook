import Image from 'next/image';
import iconDone from './img/done.png';
import iconCurrent from './img/current.png';
import style from './stepper.module.scss';

interface PropsType {
    step: 0 | 1 | 2;
}

function Stepper({ step }: PropsType) {
    const renderStepIcon = (process: number) => {
        if (step === process) {
            return <Image alt="" height={18} src={iconCurrent} width={18} />;
        }
        if (step > process) {
            return <Image alt="" height={18} src={iconDone} width={18} />;
        }
        return <div className={style.step} />;
    };

    return (
        <div className={style.stepper}>
            <div className={style.stepName}>
                <div className={`${style.label} ${step === 0 ? style.focused : ''}`}>选择赛事</div>
                <div className={`${style.label} ${step === 1 ? style.focused : ''}`}>
                    选择盘口 & 撰写内文
                </div>
                <div className={`${style.label} ${step === 2 ? style.focused : ''}`}>发布文章</div>
            </div>
            <div className={style.process}>
                {renderStepIcon(0)}
                <hr />
                {renderStepIcon(1)}
                <hr />
                {renderStepIcon(2)}
            </div>
        </div>
    );
}

export default Stepper;
