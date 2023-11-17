import Select from '@/app/contest/football/[matchId]/(dashboard)/components/select/select';
import type {
    GameAmountProps,
    GameTypeProps,
    GameCompanyProps,
    GameHandicapProps,
    FilterProps
} from '@/types/analyze';

const contestAmountList = [
    { label: '近10场', value: 10 },
    { label: '近20场', value: 20 }
];

const contestTypeList = [
    { label: '全部赛事', value: '2' },
    { label: '联赛', value: '0' },
    { label: '杯赛', value: '1' }
];

const componyList = [
    { label: '皇*', value: 'crown' },
    { label: 'Bet*', value: 'bet365' }
];

const handicapList = [
    { label: '终', value: 'current' },
    { label: '初', value: 'initial' }
];

interface PropsType {
    contestAmount: GameAmountProps;
    contestType: GameTypeProps;
    contestCompany: GameCompanyProps;
    contestHandicap: GameHandicapProps;
    setContestAmount: (value: GameAmountProps) => void;
    setContestType: (value: GameTypeProps) => void;
    setContestCompany: (value: GameCompanyProps) => void;
    setContestHandicap: (value: GameHandicapProps) => void;
    handleFilterList: (value: FilterProps) => void;
}

function SelectList({
    contestAmount,
    contestType,
    contestCompany,
    contestHandicap,
    setContestAmount,
    setContestType,
    setContestCompany,
    setContestHandicap,
    handleFilterList
}: PropsType) {
    return (
        <div className="tableHead">
            <div className="tr">
                <div className="th">
                    <Select
                        onChange={value => {
                            setContestAmount(value as GameAmountProps);
                            handleFilterList({
                                amount: value as GameAmountProps
                            });
                        }}
                        options={contestAmountList}
                        selectedValue={contestAmount}
                    />
                </div>
                <div className="th">
                    <Select
                        onChange={value => {
                            setContestType(value as GameTypeProps);
                            handleFilterList({ type: value as GameTypeProps });
                        }}
                        options={contestTypeList}
                        selectedValue={contestType}
                    />
                </div>
                <div className="th">
                    <Select
                        onChange={value => {
                            setContestCompany(value as GameCompanyProps);
                            handleFilterList({ company: value as GameCompanyProps });
                        }}
                        options={componyList}
                        selectedValue={contestCompany}
                    />
                </div>
                <div className="th">
                    <Select
                        onChange={value => {
                            setContestHandicap(value as GameHandicapProps);
                            handleFilterList({ handicap: value as GameHandicapProps });
                        }}
                        options={handicapList}
                        selectedValue={contestHandicap}
                    />
                </div>
            </div>
        </div>
    );
}

export default SelectList;
