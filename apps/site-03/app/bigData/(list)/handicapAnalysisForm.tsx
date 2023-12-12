import { motion } from 'framer-motion';
import Image from 'next/image';
import dayjs from 'dayjs';
import { mqttService } from 'lib';
import style from './disSelect.module.scss';
import { GameFilter } from './components/gameFilter/gameFilter';
import SelectOption from './components/selectOption/selectOption';
import RecordFilter from './components/recordFilter/recordFilter';
import starIcon from './img/star.png';
import Datepicker from './components/datepicker/datepicker';
import { useHandicapAnalysisFormStore } from './handicapAnalysisFormStore';
import { useUserStore } from '@/app/userStore';

function TimeRange({ timeRange }: { timeRange: string }) {
    const openDatePicker = useHandicapAnalysisFormStore.use.openDatePicker();
    const setOpenDatePicker = useHandicapAnalysisFormStore.use.setOpenDatePicker();
    const setTimeRange = useHandicapAnalysisFormStore.use.setTimeRange();
    const dateList = useHandicapAnalysisFormStore.use.dateList();
    const setStartDate = useHandicapAnalysisFormStore.use.setStartDate();
    const setEndDate = useHandicapAnalysisFormStore.use.setEndDate();

    const updateQueryDate = (
        startDateSelected?: number,
        endDateSelected?: number,
        type?: string
    ) => {
        if (type) {
            setStartDate(dayjs().subtract(1, 'day').toDate().getTime());

            switch (type) {
                case 'week':
                    setEndDate(dayjs().subtract(8, 'day').toDate().getTime());
                    break;
                case 'month':
                    setEndDate(dayjs().subtract(31, 'day').toDate().getTime());
                    break;
                case 'season':
                    setEndDate(dayjs().subtract(91, 'day').toDate().getTime());
                    break;
            }
        } else if (startDateSelected && endDateSelected) {
            setStartDate(startDateSelected);
            setEndDate(endDateSelected);
        }
    };

    return (
        <SelectOption
            openDatePicker={openDatePicker}
            options={dateList}
            placeholder="选择时间"
            selectTitle="区间"
            setOpenDatePicker={setOpenDatePicker}
            setSelected={setTimeRange}
            title="时间范围"
            valueSelected={timeRange}
        >
            <Datepicker
                openModal={openDatePicker}
                setOpenModal={setOpenDatePicker}
                updateQueryDate={updateQueryDate}
            />
        </SelectOption>
    );
}

function OverUnderSelect({ handicapOddsSelected }: { handicapOddsSelected: string }) {
    const overUnderNumberList = useHandicapAnalysisFormStore.use.overUnderNumberList();
    const setHandicapOddsSelected = useHandicapAnalysisFormStore.use.setHandicapOddsSelected();

    return (
        <SelectOption
            options={overUnderNumberList}
            placeholder="不挑选"
            selectTitle="盘口"
            setSelected={setHandicapOddsSelected}
            title="全场大小"
            valueSelected={handicapOddsSelected}
        />
    );
}

function HandicapSelect({
    teamSelected,
    teamHandicapOdds
}: {
    teamSelected: string;
    teamHandicapOdds: string;
}) {
    const teamList = useHandicapAnalysisFormStore.use.teamList();
    const setTeamSelected = useHandicapAnalysisFormStore.use.setTeamSelected();
    const setTeamHandicapOdds = useHandicapAnalysisFormStore.use.setTeamHandicapOdds();
    const handicapNumberList = useHandicapAnalysisFormStore.use.handicapNumberList();

    return (
        <section className={style.items}>
            <p className={style.title}>全场让球</p>
            <div className={style.select}>
                <div className={style.selectTitle}>让方</div>
                <GameFilter
                    onChange={(val: string) => {
                        setTeamSelected(val);
                    }}
                    options={teamList}
                    placeholder="选择主队"
                    showCloseButton={false}
                    showDragBar
                    title="选择让方"
                    value={teamSelected}
                />
                <GameFilter
                    onChange={(val: string) => {
                        setTeamHandicapOdds(val);
                    }}
                    options={handicapNumberList}
                    placeholder="选择让球"
                    showCloseButton={false}
                    showDragBar
                    title="选择让方"
                    value={teamHandicapOdds}
                />
            </div>
        </section>
    );
}

function HandicapAnalysisForm() {
    const userInfo = useUserStore.use.userInfo();
    const showRecord = useHandicapAnalysisFormStore.use.showRecord();
    const setShowRecord = useHandicapAnalysisFormStore.use.setShowRecord();
    const timeRange = useHandicapAnalysisFormStore.use.timeRange();
    const analysisError = useHandicapAnalysisFormStore.use.analysisError();
    const setAnalysisError = useHandicapAnalysisFormStore.use.setAnalysisError();
    const startDate = useHandicapAnalysisFormStore.use.startDate();
    const endDate = useHandicapAnalysisFormStore.use.endDate();
    const teamSelected = useHandicapAnalysisFormStore.use.teamSelected();
    const teamHandicapOdds = useHandicapAnalysisFormStore.use.teamHandicapOdds();
    const handicapOddsSelected = useHandicapAnalysisFormStore.use.handicapOddsSelected();

    const getTrendAnalysis = () => {
        if (!timeRange) {
            setAnalysisError('请选择时间区间');
            return;
        } else if ((!teamSelected || !teamHandicapOdds) && !handicapOddsSelected) {
            setAnalysisError('让方或盘口需至少选择一种');
            return;
        }

        let getStartDate = 0;
        let getEndDate = 0;

        switch (timeRange) {
            case 'week':
                getStartDate = dayjs().subtract(7, 'day').unix();
                getEndDate = dayjs().subtract(1, 'day').unix();
                break;
            case 'month':
                getStartDate = dayjs().subtract(30, 'day').unix();
                getEndDate = dayjs().subtract(1, 'day').unix();

                break;
            case 'season':
                getStartDate = dayjs().subtract(120, 'day').unix();
                getEndDate = dayjs().subtract(1, 'day').unix();
                break;
        }

        const params = {
            mission: 'create',
            memberId: userInfo.uid,
            handicapSide: teamSelected,
            handicapValues: teamHandicapOdds,
            overUnderValues: handicapOddsSelected,
            startTime: getStartDate || startDate,
            endTime: getEndDate || endDate
        };

        void mqttService.publishAnalysis(params);

        setShowRecord(true);
    };

    return (
        <>
            <div
                className={style.record}
                onClick={() => {
                    setShowRecord(true);
                }}
            >
                分析纪录
            </div>
            <HandicapSelect teamHandicapOdds={teamHandicapOdds} teamSelected={teamSelected} />
            <OverUnderSelect handicapOddsSelected={handicapOddsSelected} />
            <TimeRange timeRange={timeRange} />
            <div className={style.tips}>
                数据中心将会汇整出符合您条件设定，在时间区间内开出相同盘口的赛事
            </div>
            <div className={style.error}>{analysisError}</div>
            <motion.button
                className={style.search}
                onClick={() => {
                    getTrendAnalysis();
                }}
                type="button"
                whileTap={{ scale: 0.9 }}
            >
                <Image alt="" height={14} src={starIcon.src} width={14} />
                获得趋势分析
            </motion.button>
            <RecordFilter
                isOpen={showRecord}
                onClose={() => {
                    setShowRecord(false);
                }}
                onOpen={() => {
                    setShowRecord(true);
                }}
            />
        </>
    );
}

export default HandicapAnalysisForm;
