import type { ChangeEvent } from 'react';
import { useRef } from 'react';
import dayjs from 'dayjs';
import style from './dateRangePicker.module.scss';

function DateRangePicker({
    startDate,
    setStartDate,
    endDate,
    setEndDate
}: {
    startDate: string;
    setStartDate: (val: string) => void;
    endDate: string;
    setEndDate: (val: string) => void;
}) {
    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = event.target.value;
        setStartDate(newStartDate);

        if (!dayjs(endDate).isAfter(dayjs(newStartDate))) {
            const newEndDate = dayjs(newStartDate).add(7, 'day').format('YYYY-MM-DD');
            setEndDate(newEndDate);
        }
    };

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEndDate = event.target.value;
        setEndDate(newEndDate);

        if (!dayjs(newEndDate).isAfter(dayjs(startDate))) {
            const newStartDate = dayjs(newEndDate).subtract(7, 'day').format('YYYY-MM-DD');
            setStartDate(newStartDate);
        }
    };

    const startDateInputRef = useRef<HTMLInputElement>(null);
    const endDateInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={style.dateRangePicker}>
            <label htmlFor="startDate">{dayjs(startDate).format('YYYY/M/D')}</label>
            <input
                className={style.startDate}
                id="startDate"
                name="startDate"
                onChange={handleStartDateChange}
                ref={startDateInputRef}
                type="date"
                value={startDate}
            />
            <span className={style.dash}>-</span>
            <label className={`${style.endDate}`} htmlFor="endDate">
                {dayjs(endDate).format('YYYY/M/D')}
            </label>
            <input
                className={style.endDate}
                id="endDate"
                name="endDate"
                onChange={handleEndDateChange}
                ref={endDateInputRef}
                type="date"
                value={endDate}
            />
        </div>
    );
}

export default DateRangePicker;
