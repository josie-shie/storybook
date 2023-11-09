import { useExponentStore } from '../../exponentStore';
import style from './exponent.module.scss';
import Handicap from './handicap';
import TotalGoal from './totalGoal';
import WinLose from './winLose';
import ButtonSwitch from '@/components/textSwitch/buttonSwitch';
import TextRadio from '@/components/textSwitch/textSwitch';
import type { ExponentType, TotalGoalsRadioType } from '@/types/exponent';

function ExponentTable() {
    const totalGoalsRadio = useExponentStore.use.totalGoalsRadio();
    const setTotalGoalsRadio = useExponentStore.use.setTotalGoalsRadio();
    const options = useExponentStore.use.options();
    const selectedOption = useExponentStore.use.selectedOption();
    const setSelectedOption = useExponentStore.use.setSelectedOption();

    const selectedMap = {
        handicapsData: <Handicap />,
        winLoseData: <WinLose />,
        totalGoalData: <TotalGoal />
    };

    return (
        <div className={style.exponentTable}>
            <div className={style.options}>
                <ButtonSwitch
                    onChange={(switchValue: ExponentType) => {
                        setSelectedOption(switchValue);
                    }}
                    options={options}
                    outline
                    value={selectedOption}
                />
                <TextRadio
                    onChange={value => {
                        setTotalGoalsRadio(value as TotalGoalsRadioType);
                    }}
                    value={totalGoalsRadio}
                />
            </div>
            <div className="topBar">
                <h6 className="title">赛前指数</h6>
            </div>
            {selectedMap[selectedOption]}
        </div>
    );
}

export default ExponentTable;
