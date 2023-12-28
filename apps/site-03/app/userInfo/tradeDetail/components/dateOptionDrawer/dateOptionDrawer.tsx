import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { getMemberTransactionList } from 'data-center';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import DatePicker from '../datepicker/datepicker';
import { useTardeDetailStore } from '../../tradeDetailStore';
import type { TradeTypeOption, DateOption } from '../../tradeDetailStore';
import { dateOption } from '../../options';
import style from './dateOptionDrawer.module.scss';

interface DateRangeProps {
    activeDate: DateOption;
    tradeType: TradeTypeOption;
    isDateRangeOpen: boolean;
    setIsDateRangeOpen: (arg: boolean) => void;
    setStartDate: Dispatch<SetStateAction<number>>;
    setEndDate: Dispatch<SetStateAction<number>>;
    setActiveDate: Dispatch<SetStateAction<DateOption>>;
    setDateDisplay: Dispatch<SetStateAction<string>>;
}

function DateRangeOption({
    tradeType,
    setActiveDate,
    activeDate,
    isDateRangeOpen,
    setIsDateRangeOpen,
    setStartDate,
    setEndDate,
    setDateDisplay
}: DateRangeProps) {
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();
    const [isOpenDatePick, setIsOpenDatePick] = useState(false);

    const getStartDate = (type: string) => {
        const today = Math.floor(new Date().getTime() / 1000);
        switch (type) {
            case 'ALL':
                return [0, 0];
            case 'WEEK':
                return [Math.floor(dayjs().subtract(1, 'week').toDate().getTime() / 1000), today];
            case 'TWOWEEKS':
                return [Math.floor(dayjs().subtract(2, 'week').toDate().getTime() / 1000), today];
            case 'MONTH':
                return [Math.floor(dayjs().subtract(1, 'month').toDate().getTime() / 1000), today];
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
                        {dateOption.map(option => (
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
                setDateDisplay={setDateDisplay}
                setIsDateRangeOpen={setIsDateRangeOpen}
                setOpenModal={setIsOpenDatePick}
            />
        </>
    );
}

export default DateRangeOption;
