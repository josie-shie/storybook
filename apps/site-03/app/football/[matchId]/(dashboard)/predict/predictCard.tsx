import Image from 'next/image';
import type { RecommendPost } from 'data-center';
import { handleMatchDateTime } from 'lib';
import { useRouter } from 'next/navigation';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Avatar from '@/components/avatar/avatar';
import hotIcon from './img/hot.png';
import style from './predict.module.scss';
import coinIcon from './img/coin.png';

function PredictCard({ predictInfo }: { predictInfo: RecommendPost }) {
    const router = useRouter();
    const dateFormat = () => {
        const dataTime = handleMatchDateTime(predictInfo.createdAt);
        if (!dataTime) return null;

        if (dataTime.length > 5) {
            return ` ${dataTime}`;
        }
        return `今天 ${dataTime}`;
    };

    return (
        <div
            className={style.predictCard}
            onClick={() => {
                router.push(`/master/articleDetail/${predictInfo.id}`);
            }}
        >
            <div className={style.mentor}>
                <div className={style.mentorInfo}>
                    <Avatar borderColor="#4489ff" size={40} src={predictInfo.avatarPath} />
                    <div className={style.avatarBar}>
                        <h3 className={style.mentorName}>{predictInfo.mentorName}</h3>
                        <div className={style.tag}>
                            {predictInfo.tag.weekHitRecentTen > 0 && (
                                <TagSplit
                                    isBlueBg={false}
                                    number={predictInfo.tag.weekHitRecentTen}
                                    hit={true}
                                    text="近"
                                />
                            )}
                            {predictInfo.tag.winMaxAccurateStreak > 0 && (
                                <Tag
                                    icon={<Image alt="" height={10} src={hotIcon} width={8} />}
                                    text={`${predictInfo.tag.winMaxAccurateStreak}連紅`}
                                />
                            )}
                            {predictInfo.tag.quarterRanking > 0 && (
                                <TagSplit
                                    isBlueBg={false}
                                    number={predictInfo.tag.quarterRanking}
                                    text="季"
                                />
                            )}
                            {predictInfo.tag.monthRanking > 0 && (
                                <TagSplit
                                    isBlueBg={false}
                                    number={predictInfo.tag.monthRanking}
                                    text="月"
                                />
                            )}
                            {predictInfo.tag.weekRanking > 0 && (
                                <TagSplit
                                    isBlueBg={false}
                                    number={predictInfo.tag.weekRanking}
                                    text="周"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.price}>
                    <div className={style.priceButton}>
                        <span className={style.icon}>
                            <Image alt="" height={14} src={coinIcon} width={14} />
                        </span>
                        <span className={style.price}>{predictInfo.price}</span>
                    </div>
                    <p className={style.unlockTotal}>已有{predictInfo.unlockCounts}人解锁</p>
                </div>
            </div>
            <h3 className={style.title}>{predictInfo.analysisTitle}</h3>
            <div className={style.publishTime}>发表于{dateFormat()}</div>
        </div>
    );
}

export default PredictCard;
