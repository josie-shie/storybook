import type { ReactNode } from 'react';
import type { PlayTypeCheckBox } from '@/app/aiBigData/queryFormStore';
import { useQueryFormStore } from '@/app/aiBigData/queryFormStore';
import { useNotificationStore } from '@/store/notificationStore';
import DateRangePicker from '@/components/dateRangePicker/dateRangePicker';
import StepIndicator from '../stepIndicator/stepIndicator';
import OptionButton from '../optionButton/optionButton';
import style from './form.module.scss';
import SelectIcon from './img/select.svg';

function DateRangePickerInput() {
    const startDate = useQueryFormStore.use.startDate();
    const endDate = useQueryFormStore.use.endDate();
    const setStartDate = useQueryFormStore.use.setStartDate();
    const setEndDate = useQueryFormStore.use.setEndDate();
    const checkboxState = useQueryFormStore.use.checkboxState();
    const { handicap, overUnder } = checkboxState;

    let datepickerStep: string;
    if (handicap) {
        datepickerStep = overUnder ? '4' : '3';
    } else {
        datepickerStep = '2';
    }

    return (
        <div className={`${style.step} ${style.space}`} key="finalStep">
            <StepIndicator stepNumber={datepickerStep} text="选择时间" />
            <div className={style.timeRange}>
                <DateRangePicker
                    endDate={endDate}
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                    startDate={startDate}
                />
            </div>
        </div>
    );
}

function OverUnderCheckbox({ keyValue, stepNumber }: { keyValue: string; stepNumber: string }) {
    const handicapOddsSelected = useQueryFormStore.use.handicapOddsSelected();
    const setHandicapOddsSelected = useQueryFormStore.use.setHandicapOddsSelected();
    const overUnderNumberList = useQueryFormStore.use.overUnderNumberList();

    return (
        <div className={`${style.step} ${style.space}`} key={keyValue}>
            <StepIndicator stepNumber={stepNumber} subText="(单选)" text="选择大小球" />
            <div className={style.multipleOption}>
                {overUnderNumberList.map(overUnderOption => {
                    return (
                        <OptionButton
                            checkedValue={handicapOddsSelected === overUnderOption.value}
                            imageSrc={<SelectIcon />}
                            key={`overUnder_${overUnderOption.value}`}
                            label={overUnderOption.label}
                            name={overUnderOption.value}
                            onClick={() => {
                                setHandicapOddsSelected(overUnderOption.value);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function HandicapOddsCheckbox() {
    const teamHandicapOdds = useQueryFormStore.use.teamHandicapOdds();
    const setTeamHandicapOdds = useQueryFormStore.use.setTeamHandicapOdds();
    const handicapNumberList = useQueryFormStore.use.handicapNumberList();

    return (
        <div className={`${style.step} ${style.space}`} key="handicapStep2">
            <StepIndicator stepNumber="2" subText="(单选)" text="选择让分数" />
            <div className={style.multipleOption}>
                {handicapNumberList.map(handicapOption => {
                    return (
                        <OptionButton
                            checkedValue={teamHandicapOdds === handicapOption.value}
                            imageSrc={<SelectIcon />}
                            key={`handicapOdds_${handicapOption.value}`}
                            label={handicapOption.label}
                            name={handicapOption.value}
                            onClick={() => {
                                setTeamHandicapOdds(handicapOption.value);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function HandicapCheckbox() {
    const teamSelected = useQueryFormStore.use.teamSelected();
    const setTeamSelected = useQueryFormStore.use.setTeamSelected();

    return (
        <div className={style.step} key="handicapStep1">
            <StepIndicator stepNumber="1" text="选择让方" />
            <div className={style.options}>
                <OptionButton
                    checkedValue={teamSelected.includes('home')}
                    imageSrc={<SelectIcon />}
                    label="主队"
                    name="home"
                    onClick={() => {
                        setTeamSelected('home');
                    }}
                />
                <OptionButton
                    checkedValue={teamSelected.includes('away')}
                    imageSrc={<SelectIcon />}
                    label="客队"
                    name="away"
                    onClick={() => {
                        setTeamSelected('away');
                    }}
                />
            </div>
        </div>
    );
}

function PlayTypeCheckbox() {
    const checkboxState = useQueryFormStore.use.checkboxState();
    const { handicap, overUnder } = checkboxState;
    const setCheckboxState = useQueryFormStore.use.setCheckboxState();
    const setIsVisible = useNotificationStore.use.setIsVisible();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, oppositeOption: string) => {
        if (!checkboxState[oppositeOption] && !event.target.checked) {
            setIsVisible('让球与大小球至少选择一项', 'success');
        }

        setCheckboxState(event.target.name as PlayTypeCheckBox, event.target.checked);
    };

    return (
        <div className={style.step} key="handicapStep0">
            <StepIndicator stepNumber="0" text="玩法" />
            <div className={style.options}>
                <OptionButton
                    checkedValue={handicap}
                    imageSrc={<SelectIcon />}
                    key="playType_handicap"
                    label="让分"
                    name="handicap"
                    onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e, 'overUnder');
                    }}
                />
                <OptionButton
                    checkedValue={overUnder}
                    imageSrc={<SelectIcon />}
                    key="playType_overUnder"
                    label="大小"
                    name="overUnder"
                    onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e, 'handicap');
                    }}
                />
            </div>
        </div>
    );
}

function StepperProcess() {
    const checkboxState = useQueryFormStore.use.checkboxState();
    const { handicap, overUnder } = checkboxState;

    const steps: ReactNode[] = [];
    steps.push(<PlayTypeCheckbox key="PlayTypeCheckbox" />);

    if (handicap) {
        steps.push(<HandicapCheckbox key="HandicapCheckbox" />);

        steps.push(<HandicapOddsCheckbox key="handicapOddsCheckbox" />);

        if (overUnder) {
            steps.push(
                <OverUnderCheckbox
                    key="handicapOverUnder"
                    keyValue="handicapOverUnder"
                    stepNumber="3"
                />
            );
        }
    } else if (overUnder) {
        steps.push(
            <OverUnderCheckbox key="overUnderOnly" keyValue="overUnderOnly" stepNumber="1" />
        );
    }

    steps.push(<DateRangePickerInput key="DateRangePickerInput" />);

    return <div className={style.steps}>{steps}</div>;
}

function Form() {
    return <StepperProcess />;
}

export default Form;
