import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import UnlockButton from '@/components/unlockButton/unlockButton';
import type { PredictArticleType } from '@/types/predict';
import { useMasterAvatarStore } from '../../masterAvatarStore';
import style from './analysisItem.module.scss';
import IconWin from './img/win.png';
import IconDraw from './img/draw.png';
import IconLose from './img/lose.png';
import { useEffect } from 'react';
import { getPostList } from 'data-center';
import { useRouter } from 'next/navigation';

function AnalysisItem({ params }: { params: { masterId: string } }) {
    const predictArticleList = useMasterAvatarStore.use.predictArticleList();
    const setPredictArticleList = useMasterAvatarStore.use.setPredictArticleList();

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
        HANDICAP: '大小',
        OVERUNDER: '让分'
    };

    const fetchData = async () => {
        try {
            const res = await getPostList({
                memberId: Number(params.masterId),
                postFilter: ['all']
            });

            if (!res.success) {
                return new Error();
            }

            setPredictArticleList({ predictArticleList: res.data.posts });
        } catch (error) {
            return new Error();
        }
    };

    const goArticleDetail = (id: number) => {
        router.push(`/master/article/${id}`);
    };

    useEffect(() => {
        void fetchData();
    }, []);

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
                        <div className={style.mid} onClick={() => goArticleDetail(item.id)}>
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
                            发表于 {timestampToMonthDay(item.createdAt)}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default AnalysisItem;
