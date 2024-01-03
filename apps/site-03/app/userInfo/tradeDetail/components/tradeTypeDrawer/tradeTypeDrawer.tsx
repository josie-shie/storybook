import { Button } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { getMemberTransactionList, type ChangeTypeCategory } from 'data-center';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import { useTardeDetailStore } from '../../tradeDetailStore';
import { tradeOption } from '../../options';
import style from './tradeTypeDrawer.module.scss';

interface TradeTypeProps {
    start: number;
    end: number;
    tradeType: ChangeTypeCategory;
    isTradeTypeOpen: boolean;
    setTradeType: Dispatch<SetStateAction<ChangeTypeCategory>>;
    setIsTradeTypeOpen: (arg: boolean) => void;
    setPage: (arg: number) => void;
}

function TradeTypeDrawer({
    start,
    end,
    isTradeTypeOpen,
    setIsTradeTypeOpen,
    tradeType,
    setTradeType,
    setPage
}: TradeTypeProps) {
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();
    const handleChangeType = async (type: ChangeTypeCategory) => {
        const data = await getMemberTransactionList({
            startTime: start ? start : 0,
            endTime: end ? end : 0,
            changeTypeCategory: type,
            currencyPage: 1,
            prepage: 20
        });
        if (data.success) {
            setTradeDetailList({
                detailList: data.data.list,
                pagination: {
                    pageCount: data.data.totalPages,
                    totalCount: data.data.totalCount
                }
            });
        }
        setTradeType(type);
        setPage(1);
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
                <div className={style.buttonBlock}>
                    {tradeOption.map(option => (
                        <Button
                            className={`${style.filterButton} ${
                                tradeType === option.value && style.active
                            }`}
                            key={option.value}
                            onClick={() => {
                                void handleChangeType(option.value as ChangeTypeCategory);
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
