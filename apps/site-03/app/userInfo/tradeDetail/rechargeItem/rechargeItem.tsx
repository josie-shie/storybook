import Image from 'next/image';
import { timestampToString } from 'lib';
import { type GetMemberTransactionData } from 'data-center';
import style from './rechargeItem.module.scss';
import recharge from './img/recharge.png';

interface PropsType {
    data: GetMemberTransactionData;
}

const statusMap = {
    PENDING: { display: '处理中', style: style.pending },
    SUCCESS: { display: '已完成', style: style.success },
    FAIL: { display: '交易失败', style: style.fail }
};

function RechargeItem({ data }: PropsType) {
    const money = data.amountOfChange > 0 ? `+${data.amountOfChange}` : data.amountOfChange;
    const statusStyle = statusMap[data.rechargeStatus || 'PENDING'].style;
    const statusLabel = statusMap[data.rechargeStatus || 'PENDING'].display;

    return (
        <div className={style.tradeItem}>
            <div className={style.left}>
                <Image alt="" height={32} src={recharge} width={32} />
            </div>
            <div className={style.center}>
                <div className={style.title}>
                    {data.changeTypeCategoryDisplayName}-{data.changeTypeDisplayName}
                </div>
                {data.rechargeStatus !== 'FAIL' && (
                    <div className={style.content}>
                        {data.currencyCode}:平台币 = 1:{data.exchangeRate}
                    </div>
                )}
                <div className={style.content}>
                    {timestampToString(data.createdAt, 'YYYY/MM/DD HH:mm')}
                </div>
                <div className={style.content}>交易编号:{data.rechargeId}</div>
            </div>
            <div className={style.right}>
                <div className={`${style.money} ${data.rechargeStatus === 'FAIL' && style.grey}`}>
                    平台币 {money}
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
