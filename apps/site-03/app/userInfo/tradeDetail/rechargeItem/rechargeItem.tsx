import Image from 'next/image';
import dayjs from 'dayjs';
import { type RechargeData } from '../tradeDetailStore';
import style from './rechargeItem.module.scss';
import recharge from './img/recharge.png';

interface PropsType {
    data: RechargeData;
}

const statusStyleMap = {
    PENDING: style.pending,
    SUCCESS: style.success,
    FAIL: style.fail
};

const statusTextMap = {
    PENDING: '处理中',
    SUCCESS: '已完成',
    FAIL: '交易失败'
};

function RechargeItem({ data }: PropsType) {
    const money = data.amountOfChange > 0 ? `+${data.amountOfChange}` : data.amountOfChange;
    const statusStyle = statusStyleMap[data.rechargeStatus];
    const statusLabel = statusTextMap[data.rechargeStatus];

    return (
        <div className={style.tradeItem}>
            <div className={style.left}>
                <Image alt="" height={32} src={recharge} width={32} />
            </div>
            <div className={style.center}>
                <div className={style.title}>{data.changeTypeDisplayName}</div>
                {data.rechargeStatus !== 'FAIL' && (
                    <div className={style.content}>
                        {data.currencyCode}:平台币 = 1:{data.exchangeRate}
                    </div>
                )}
                <div className={style.content}>
                    {dayjs(data.createdAt).format('YYYY/MM/DD HH:mm')}
                </div>
                <div className={style.content}>交易编号:{data.rechargeId}</div>
            </div>
            <div className={style.right}>
                <div className={`${style.money} ${data.rechargeStatus === 'FAIL' && style.grey}`}>
                    RMB {money}
                </div>
                <div className={style.result}>
                    <div className={`${style.status} ${statusStyle}`}>{statusLabel}</div>
                    <div className={style.overage}>可用馀额：{data.balanceAfter}</div>
                </div>
            </div>
        </div>
    );
}

export default RechargeItem;
