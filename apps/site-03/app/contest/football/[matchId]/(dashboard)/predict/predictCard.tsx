import Image from 'next/image';
import style from './predict.module.scss';
import hotIcon from './img/hot.png';
import coinIcon from './img/coin.png';
import type { Predict } from '@/types/predict';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

interface PredictCardProps {
    predictInfo: Predict;
}

function PredictCard({ predictInfo }: PredictCardProps) {
    return (
        <div className={style.predictCard}>
            <div className={style.mentor}>
                <div className={style.mentorInfo}>
                    <Avatar borderColor="#4489ff" size={40} src={predictInfo.mentor_avatar.src} />
                    <div className={style.title}>
                        <h3 className={style.mentorName}>{predictInfo.mentorName}</h3>
                        <div className={style.tag}>
                            <Tag
                                icon={<Image alt="" height={10} src={hotIcon} width={8} />}
                                text="9連紅"
                            />
                            <Tag
                                background="#4489FF"
                                color="#FFF"
                                text={`月榜${predictInfo.rank}`}
                            />
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
                    <p className={style.unlockTotal}>已有{predictInfo.unlockTotal}人解鎖</p>
                </div>
            </div>
            <h3 className={style.title}>
                【{predictInfo.max_accurate_streak}连胜】{predictInfo.homeChs}vs
                {predictInfo.awayChs}，来看我的精心推荐吧
            </h3>
            <div className={style.publishTime}>发表于今天 {predictInfo.createdAt}</div>
        </div>
    );
}

export default PredictCard;
