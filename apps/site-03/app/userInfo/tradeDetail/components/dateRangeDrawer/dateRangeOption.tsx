import { Button } from '@mui/material';
import style from './dateRangeDrawer.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

interface DateRangeProps {
    isDateRangeOpen: boolean;
    setDateRangeOpen: (arg: boolean) => void;
}

type MapType = Record<
    'week' | 'twoWeeks' | 'month',
    {
        label: string;
        // value: (days: number) => (number | null)[];
    }
>;

function DateRangeOption({ isDateRangeOpen, setDateRangeOpen }: DateRangeProps) {
    // const getDateRange = (days: number) => {
    //     const today = new Date();
    //     const pastDate = new Date();
    //     pastDate.setDate(today.getDate() - days);

    //     return [pastDate.getTime(), today.getTime()];
    // };

    const DateMap: MapType = {
        week: {
            label: '一週'
            // value: getDateRange(7)
        },
        twoWeeks: {
            label: '兩週'
            // value: getDateRange(14)
        },
        month: {
            label: '一個月'
            // value: getDateRange(30)
        }
    };

    // const handleChangeDate = (key: keyof typeof DateMap) => {
    //     setDateRange(DateMap[key].value);
    //     setDateRangeOpen(false);
    // };

    return (
        <BottomDrawer
            isOpen={isDateRangeOpen}
            onClose={() => {
                setDateRangeOpen(false);
            }}
            onOpen={() => {
                setDateRangeOpen(true);
            }}
        >
            <div className={style.dateRangeDrawer}>
                <div className={style.title}>
                    <span>選擇時間</span>
                </div>
                <div className={style.buttomBlock}>
                    {Object.entries(DateMap).map(([key, value]) => (
                        <Button
                            className={style.filterButton}
                            key={key}
                            // onClick={() => {
                            //     handleChangeDate(key);
                            // }}
                        >
                            {value.label}
                        </Button>
                    ))}
                    <Button className={style.filterButton}>選擇時間區間</Button>
                </div>
            </div>
        </BottomDrawer>
    );
}

export default DateRangeOption;
