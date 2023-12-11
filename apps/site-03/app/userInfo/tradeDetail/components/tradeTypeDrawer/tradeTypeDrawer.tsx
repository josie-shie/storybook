import { Button } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { useTardeDetailStore, type TradeTypeOption } from '../../tradeDetailStore';
import style from './tradeTypeDrawer.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

interface TradeTypeProps {
    tradeType: TradeTypeOption;
    isTradeTypeOpen: boolean;
    setTradeType: Dispatch<SetStateAction<TradeTypeOption>>;
    setIsTradeTypeOpen: (arg: boolean) => void;
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

function TradeTypeDrawer({
    isTradeTypeOpen,
    setIsTradeTypeOpen,
    tradeType,
    setTradeType,
    handleChangeOption
}: TradeTypeProps) {
    const tradeOption = useTardeDetailStore.use.tradeOption();

    const handleChangeType = (type: TradeTypeOption) => {
        setTradeType(type);
        handleChangeOption({ type });
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
                    {tradeOption.map(option => (
                        <Button
                            className={`${style.filterButton} ${
                                tradeType === option.value && style.active
                            }`}
                            key={option.value}
                            onClick={() => {
                                handleChangeType(option.value as TradeTypeOption);
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

export default TradeTypeDrawer;
