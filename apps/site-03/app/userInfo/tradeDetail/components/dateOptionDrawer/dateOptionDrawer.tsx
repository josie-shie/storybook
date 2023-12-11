import { Button } from '@mui/material';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import { useTardeDetailStore, type DateOption, type TradeTypeOption } from '../../tradeDetailStore';
import style from './dateOptionDrawer.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

interface DateRangeProps {
    activeDate: DateOption;
    isDateRangeOpen: boolean;
    setIsDateRangeOpen: (arg: boolean) => void;
    setStartDate: Dispatch<SetStateAction<number | undefined>>;
    setEndDate: Dispatch<SetStateAction<number | undefined>>;
    setActiveDate: Dispatch<SetStateAction<DateOption>>;
    handleChangeOption: ({
        start,
        end,
        type
    }: {
        start?: number;
        end?: number;
        type?: TradeTypeOption;
    }) => void;
}

function DateRangeOption({
    setActiveDate,
    activeDate,
    handleChangeOption,
    isDateRangeOpen,
    setIsDateRangeOpen,
    setStartDate,
    setEndDate
}: DateRangeProps) {
    const dateList = useTardeDetailStore.use.dateOption();
    const getStartDate = (type: DateOption) => {
        const today = dayjs().startOf('day').toDate().getTime();
        switch (type) {
            case 'all':
                return [undefined, undefined];
            case 'today':
                return [dayjs().subtract(1, 'week').toDate().getTime(), today];
            case 'week':
                return [dayjs().subtract(1, 'week').toDate().getTime(), today];
            case 'month':
                return [dayjs().subtract(1, 'month').toDate().getTime(), today];
            case 'threeMonths':
                return [dayjs().subtract(3, 'month').toDate().getTime(), today];
        }
    };

    const handleChangDate = (type: DateOption) => {
        const [start, end] = getStartDate(type);
        setActiveDate(type);
        setEndDate(end);
        setStartDate(start);
        handleChangeOption({ start, end });
        setIsDateRangeOpen(false);
    };

    return (
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
                <div className={style.buttomBlock}>
                    {dateList.map(option => (
                        <Button
                            className={`${style.filterButton} ${
                                activeDate === option.value && style.active
                            }`}
                            key={option.value}
                            onClick={() => {
                                handleChangDate(option.value as DateOption);
                            }}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </div>
        </BottomDrawer>
    );
}

export default DateRangeOption;
