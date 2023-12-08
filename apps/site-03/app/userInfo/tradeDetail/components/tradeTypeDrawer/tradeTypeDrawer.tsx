import { Button } from '@mui/material';
import style from './tradeTypeDrawer.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

interface TradeTypeProps {
    isTradeTypeOpen: boolean;
    // setTradeType: Dispatch<SetStateAction<string | undefined>>;
    setIsTradeTypeOpen: (arg: boolean) => void;
}

type MapType = Record<
    'pay' | 'deposite' | 'income',
    {
        label: string;
        value: string;
    }
>;

function TradeTypeDrawer({ isTradeTypeOpen, setIsTradeTypeOpen }: TradeTypeProps) {
    const TradeTypeMap: MapType = {
        pay: {
            label: '支出',
            value: 'pay'
        },
        deposite: {
            label: '充值',
            value: 'deposite'
        },
        income: {
            label: '收入',
            value: 'income'
        }
    };

    const handleChangeDate = () => {
        // setTradeType(TradeTypeMap[key].value);
        setIsTradeTypeOpen(false);
    };

    return (
        <BottomDrawer
            isOpen={isTradeTypeOpen}
            onClose={() => {
                setIsTradeTypeOpen(false);
            }}
            onOpen={() => {
                setIsTradeTypeOpen(true);
            }}
        >
            <div className={style.dateRangeDrawer}>
                <div className={style.title}>
                    <span>選擇交易類別</span>
                </div>
                <div className={style.buttomBlock}>
                    {Object.entries(TradeTypeMap).map(([key, value]) => (
                        <Button
                            className={style.filterButton}
                            key={key}
                            onClick={() => {
                                handleChangeDate();
                            }}
                        >
                            {value.label}
                        </Button>
                    ))}
                </div>
            </div>
        </BottomDrawer>
    );
}

export default TradeTypeDrawer;
