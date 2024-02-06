import { useState } from 'react';
import { handicapToString } from 'lib';
import type { ExponentOverUnderInfo } from 'data-center';
import Select from '@/app/football/[matchId]/(dashboard)/components/select/select';
import NoData from '@/components/baseNoData/noData';
import type { TabListType } from '@/types/exponent';
import { useExponentStore } from '../../exponentStore';
import style from './exponent.module.scss';
import MoreIcon from './img/more.svg';

const oddTimeOption = [
    { label: '即时', value: 'live' },
    { label: '赛前', value: 'beforeMatch' }
];

type OddTimeType = 'live' | 'beforeMatch';

const getOddsClassName = (initialOdds: number, currentOdds: number): string => {
    if (initialOdds === currentOdds) return '';
    return initialOdds > currentOdds ? 'greenText' : 'redText';
};

function OddBar({
    targetData,
    initialData,
    isCompare
}: {
    targetData: ExponentOverUnderInfo;
    initialData?: ExponentOverUnderInfo;
    isCompare?: boolean;
}) {
    return targetData.closed ? (
        <div className="td">
            <div className="odd">-</div>
            <div className="odd">封</div>
            <div className="odd">-</div>
            <div className="odd more">
                <MoreIcon />
            </div>
        </div>
    ) : (
        <div className="td">
            <div
                className={`odd ${
                    isCompare &&
                    initialData &&
                    getOddsClassName(initialData.overOdds, targetData.overOdds)
                }`}
            >
                {targetData.overOdds}
            </div>
            <div
                className={`odd ${
                    isCompare && initialData && getOddsClassName(initialData.line, targetData.line)
                }`}
            >
                {handicapToString(targetData.line)}
            </div>
            <div
                className={`odd ${
                    isCompare &&
                    initialData &&
                    getOddsClassName(initialData.underOdds, targetData.underOdds)
                }`}
            >
                {targetData.underOdds}
            </div>
            {isCompare ? (
                <div className="odd more">
                    <MoreIcon />
                </div>
            ) : null}
        </div>
    );
}

function Corners() {
    const [oddTime, setOddTime] = useState<OddTimeType>('live');
    const companyList = useExponentStore.use.companyList().corners;
    const companyInfo = useExponentStore.use.companyInfo().corners;
    const setDetailOption = useExponentStore.use.setDetailOption();
    const setIsDetailOpen = useExponentStore.use.setIsDetailOpen();

    const handleDetail = (detailCompanyId: number, detailSelectedKind: TabListType) => {
        setDetailOption(detailCompanyId, detailSelectedKind);
        setIsDetailOpen(true);
    };

    return (
        <div className={style.handicap}>
            {companyList.length > 0 ? (
                <div className="dataTable">
                    <div className="tableHead">
                        <div className="tr">
                            <div className="th">公司</div>
                            <div className="th">初始</div>
                            <div className="th">
                                <Select
                                    onChange={value => {
                                        setOddTime(value as OddTimeType);
                                    }}
                                    options={oddTimeOption}
                                    selectedValue={oddTime}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tableBody">
                        {companyList.map(companyId => (
                            <div
                                className="tr"
                                key={companyId}
                                onClick={() => {
                                    handleDetail(companyId, 'corners');
                                }}
                            >
                                <div className="td">{companyInfo[companyId].companyName}</div>
                                <OddBar targetData={companyInfo[companyId].initial} />
                                <OddBar
                                    initialData={companyInfo[companyId].initial}
                                    isCompare
                                    targetData={companyInfo[companyId][oddTime]}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <NoData text="暂无资料" />
            )}
        </div>
    );
}

export default Corners;
