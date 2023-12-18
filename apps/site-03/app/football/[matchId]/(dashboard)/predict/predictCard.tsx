import Image from 'next/image';
import type { GetPredictionMatchPost } from 'data-center';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import style from './predict.module.scss';
import hotIcon from './img/hot.png';
import coinIcon from './img/coin.png';

function PredictCard({ predictInfo }: { predictInfo: GetPredictionMatchPost }) {
    return (
        <div className={style.predictCard}>
            <div className={style.mentor}>
                <div className={style.mentorInfo}>
                    <Avatar borderColor="#4489ff" size={40} src={predictInfo.avatarPath} />
                    <div className={style.title}>
                        <h3 className={style.mentorName}>{predictInfo.mentorName}</h3>
                        <div className={style.tag}>
                            <Tag
                                icon={<Image alt="" height={10} src={hotIcon} width={8} />}
                                text="9连红"
                            />
                            <Tag background="#4489FF" color="#FFF" text="月榜 10" />
                        </div>
                    </div>
                </div>
                <div className={style.price}>
                    <div className={style.priceButton}>
                        <span className={style.icon}>
                            <Image alt="" height={14} src={coinIcon} width={14} />
                        </span>
                        <span>{predictInfo.price}元</span>
                    </div>
                    <p className={style.unlockTotal}>已有10人解锁</p>
                </div>
            </div>
            <h3 className={style.title}>{predictInfo.analysisTitle}</h3>
            <div className={style.publishTime}>发表于今天 {predictInfo.createdAt}</div>
        </div>
    );
}

export default PredictCard;
