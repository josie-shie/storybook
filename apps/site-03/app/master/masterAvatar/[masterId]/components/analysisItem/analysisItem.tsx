import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import { useRouter } from 'next/navigation';
import { type RecommendPost } from 'data-center';
import type { PredictArticleType } from '@/types/predict';
import UnlockButton from '@/components/unlockButton/unlockButton';
import style from './analysisItem.module.scss';
import IconWin from './img/win.png';
import IconDraw from './img/draw.png';
import IconLose from './img/lose.png';

function AnalysisItem({ predictArticleList }: { predictArticleList: RecommendPost[] }) {
    const router = useRouter();

    const filterImage = (value: PredictArticleType): string => {
        const result = {
            WIN: IconWin.src,
            DRAW: IconDraw.src,
            LOSE: IconLose.src
        };
        return result[value];
    };

    const formatHandicapName = {
        HOME: '大小',
        AWAY: '大小',
        OVER: '让分',
        UNDER: '让分',
        HANDICAP: '大小',
        OVERUNDER: '让分'
    };

    const goArticleDetail = (id: number) => {
        router.push(`/master/article/${id}`);
    };

    return (
        <>
            {predictArticleList.map(item => {
                return (
                    <div className={style.analysisItem} key={item.id}>
                        <div className={style.top}>
                            <div className={style.left}>
                                <div className={style.decorate} />
                                <div className={style.title}>{item.analysisTitle}</div>
                            </div>
                            <div className={style.unlockStatus}>
                                {item.isUnlocked ? (
                                    <span className={style.unlocked}>已解鎖</span>
                                ) : (
                                    <UnlockButton price={item.price} />
                                )}
                            </div>
                        </div>
                        <div
                            className={style.mid}
                            onClick={() => {
                                goArticleDetail(item.id);
                            }}
                        >
                            <div className={style.combination}>
                                <div className={style.detail}>
                                    {item.leagueName}
                                    <span className={style.time}>
                                        | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                    </span>
                                </div>
                                <div className={style.team}>
                                    <span className={style.tag}>
                                        {formatHandicapName[item.predictedPlay]}
                                    </span>
                                    {item.homeTeamName} vs {item.awayTeamName}
                                </div>
                                {item.predictionResult === 'NONE' ? null : (
                                    <Image
                                        alt=""
                                        className={style.icon}
                                        height={46}
                                        src={filterImage(item.predictionResult)}
                                        width={46}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={style.postTime}>
                            发表于今天 {timestampToMonthDay(item.createdAt)}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default AnalysisItem;
