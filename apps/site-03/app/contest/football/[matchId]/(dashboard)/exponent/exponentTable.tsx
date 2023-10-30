import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton/ToggleButton';
import TextRadio from '../../../../../../components/textSwitch/textSwitch';
import style from './exponent.module.scss';
import { useExponentStore } from './exponentStore';
import type { ExponentType, TotalGoalsRadioType } from '@/types/exponent';

function Table() {
    const totalGoalsRadio = useExponentStore.use.totalGoalsRadio();
    const setTotalGoalsRadio = useExponentStore.use.setTotalGoalsRadio();
    const exponentData = useExponentStore.use.exponentData();
    const options = useExponentStore.use.options();
    const selectedOption = useExponentStore.use.selectedOption();
    const setSelectedOption = useExponentStore.use.setSelectedOption();

    const getColor = (inital: number, current: number) => {
        if (current < inital) {
            return '#009A63';
        } else if (current > inital) {
            return '#F85640';
        }
        return '#222222';
    };

    return (
        <>
            <div className={style.options}>
                <ToggleButtonGroup
                    aria-label="Platform"
                    color="primary"
                    exclusive
                    onChange={(_, value: ExponentType) => {
                        setSelectedOption(value);
                    }}
                    value={selectedOption}
                >
                    {options.map(option => (
                        <ToggleButton key={option.value} value={option.value}>
                            {option.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
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
            <div className="dataTable">
                <div className="tableHead">
                    <div className="tr">
                        <div className="th">初</div>
                        <div className="th">即</div>
                    </div>
                </div>
                <div className="tableBody">
                    {exponentData?.[totalGoalsRadio][selectedOption].map(data => (
                        <div className="tr" key={data.companyId}>
                            <div className="td firstColumn">{data.companyName}</div>
                            <div className="td">{data.homeInitialOdds}</div>
                            <div className="td">{data.initialHandicap}</div>
                            <div className="td">{data.awayInitialOdds}</div>

                            <div
                                className="td"
                                style={{
                                    color: getColor(data.homeInitialOdds, data.homeCurrentOdds)
                                }}
                            >
                                {data.homeCurrentOdds}
                            </div>
                            <div
                                className="td"
                                style={{
                                    color: getColor(data.initialHandicap, data.currentHandicap)
                                }}
                            >
                                {data.currentHandicap}
                            </div>
                            <div
                                className="td"
                                style={{
                                    color: getColor(data.awayInitialOdds, data.awayCurrentOdds)
                                }}
                            >
                                {data.awayCurrentOdds}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function ExponentTable() {
    return (
        <div className={style.exponentTable}>
            <Table />
        </div>
    );
}

export default ExponentTable;
