import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import UnlockButton from '@/components/unlockButton/unlockButton';
import type { PredictArticleType } from '@/types/predict';
import { useMasterAvatarStore } from '../../masterAvatarStore';
import style from './analysisItem.module.scss';
import IconWin from './img/win.png';
import IconDraw from './img/draw.png';
import IconLose from './img/lose.png';

function AnalysisItem() {
    const predictArticleList = useMasterAvatarStore.use.predictArticleList();

    const filterImage = (value: PredictArticleType): string => {
        const result = {
            WIN: IconWin.src,
            DRAW: IconDraw.src,
            LOSE: IconLose.src
        };
        return result[value];
    };

    return (
        <>
            {predictArticleList.map(item => {
                return (
                    <div className={style.analysisItem} key={item.id}>
                        <div className={style.top}>
                            <div className={style.title}>
                                <span className={style.decorate} />
                                {item.analysisTitle}
                            </div>
                            <div className={style.unlockStatus}>
                                {item.isUnlocked ? (
                                    <span className={style.unlocked}>已解鎖</span>
                                ) : (
                                    <UnlockButton />
                                )}
                            </div>
                        </div>
                        <div className={style.mid}>
                            <div className={style.combination}>
                                <div className={style.detail}>
                                    {item.leagueName}
                                    <span className={style.time}>
                                        | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                    </span>
                                </div>
                                <div className={style.team}>
                                    <span className={style.tag}>{item.predictedPlay}</span>
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
                            发表于 {timestampToMonthDay(item.createdAt)}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default AnalysisItem;
