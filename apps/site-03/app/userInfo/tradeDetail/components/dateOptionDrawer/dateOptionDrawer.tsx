import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { getMemberTransactionList } from 'data-center';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import DatePicker from '../datepicker/datepicker';
import { useTardeDetailStore } from '../../tradeDetailStore';
import type { TradeTypeOption, DateOption } from '../../tradeDetailStore';
import style from './dateOptionDrawer.module.scss';

interface DateRangeProps {
    activeDate: DateOption;
    tradeType: TradeTypeOption;
    isDateRangeOpen: boolean;
    setIsDateRangeOpen: (arg: boolean) => void;
    setStartDate: Dispatch<SetStateAction<number | undefined>>;
    setEndDate: Dispatch<SetStateAction<number | undefined>>;
    setActiveDate: Dispatch<SetStateAction<DateOption>>;
}

function DateRangeOption({
    tradeType,
    setActiveDate,
    activeDate,
    isDateRangeOpen,
    setIsDateRangeOpen,
    setStartDate,
    setEndDate
}: DateRangeProps) {
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();
    const dateList = useTardeDetailStore.use.dateOption();
    const [isOpenDatePick, setIsOpenDatePick] = useState(false);

    const getStartDate = (type: string) => {
        const today = dayjs().startOf('day').toDate().getTime();
        switch (type) {
            case 'ALL':
                return [0, 0];
            case 'TODAY':
                return [dayjs().subtract(1, 'week').toDate().getTime(), today];
            case 'WEEK':
                return [dayjs().subtract(1, 'week').toDate().getTime(), today];
            case 'MONTH':
                return [dayjs().subtract(1, 'month').toDate().getTime(), today];
            case 'THREEWEEKS':
                return [dayjs().subtract(3, 'month').toDate().getTime(), today];
            default:
                return [];
        }
    };

    const handleChangDate = async (dateRange: number[], type: DateOption) => {
        setActiveDate(type);
        setStartDate(dateRange[0]);
        setEndDate(dateRange[1]);

        const recordList = await getMemberTransactionList({
            startTime: dateRange[0],
            endTime: dateRange[1],
            changeTypeCategory: tradeType,
            currencyPage: 1,
            prepage: 20
        });
        if (recordList.success) {
            setTradeDetailList({
                detailList: recordList.data.list,
                pagination: {
                    pageCount: recordList.data.totalPages,
                    totalCount: recordList.data.totalCount
                }
            });
        }
        setIsDateRangeOpen(false);
    };

    return (
        <>
            <BottomDrawer
                isOpen={isDateRangeOpen}
                onClose={() => {
                    setIsDateRangeOpen(false);
                }}
                onOpen={() => {
                    setIsDateRangeOpen(true);
                }}
            >
                <div className={style.dateRangeDrawer}>
                    <div className={style.title}>
                        <span>选择时间</span>
                    </div>
                    <div className={style.buttonBlock}>
                        {dateList.map(option => (
                            <Button
                                className={`${style.filterButton} ${
                                    activeDate === option.value && style.active
                                }`}
                                key={option.value}
                                onClick={() => {
                                    void handleChangDate(
                                        getStartDate(option.value),
                                        option.value as DateOption
                                    );
                                }}
                            >
                                {option.label}
                            </Button>
                        ))}
                        <Button
                            className={`${style.filterButton} ${
                                activeDate === 'RANGE' && style.active
                            }`}
                            onClick={() => {
                                setIsOpenDatePick(true);
                            }}
                        >
                            选择时间
                        </Button>
                    </div>
                </div>
            </BottomDrawer>
            <DatePicker
                handleChangDate={handleChangDate}
                openModal={isOpenDatePick}
                setActiveDate={setActiveDate}
                setEnd={setEndDate}
                setIsDateRangeOpen={setIsDateRangeOpen}
                setOpenModal={setIsOpenDatePick}
                setStart={setStartDate}
            />
        </>
    );
}

export default DateRangeOption;
