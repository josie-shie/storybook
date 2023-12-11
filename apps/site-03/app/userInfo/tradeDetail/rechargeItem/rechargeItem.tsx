import Image from 'next/image';
import { type RechargeData } from '../tradeDetailStore';
import style from './rechargeItem.module.scss';
import recharge from './img/recharge.png';
// import payment from './img/payment.png';
// import income from './img/income.png';

interface PropsType {
    data: RechargeData;
}

const statusStyleMap = {
    inProgress: style.inProgress,
    completed: style.completed,
    fail: style.fail
};

const statusTextMap = {
    inProgress: '處理中',
    completed: '已完成',
    fail: '交易失敗'
};

function RechargeItem({ data }: PropsType) {
    const money = data.result > 0 ? `+${data.result}` : data.result;
    const statusStyle = statusStyleMap[data.status];
    const statusLabel = statusTextMap[data.status];

    return (
        <div className={style.tradeItem}>
            <div className={style.left}>
                <Image alt="" height={32} src={recharge} width={32} />
            </div>
            <div className={style.center}>
                <div className={style.title}>充值-{data.currency}</div>
                {data.status !== 'fail' && (
                    <div className={style.content}>
                        {data.currency}:平台幣 = 1:{data.exchangeRate}
                    </div>
                )}
                <div className={style.content}>{data.time}</div>
                <div className={style.content}>交易編號:{data.tradeNumber}</div>
            </div>
            <div className={style.right}>
                <div className={`${style.money} ${data.status === 'fail' ? style.grey : ''}`}>
                    RMB {money}
                </div>
                <div className={style.result}>
                    <div className={`${style.status} ${statusStyle}`}>{statusLabel}</div>
                    <div className={style.overage}>可用馀额：{data.overage}</div>
                </div>
            </div>
        </div>
    );
}

export default RechargeItem;
