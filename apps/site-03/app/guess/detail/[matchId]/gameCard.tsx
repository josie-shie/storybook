import Image from 'next/image';
import type { ProGuess } from 'data-center';
import Link from 'next/link';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import { useUserStore } from '@/store/userStore';
import Gone from '@/public/resultIcon/draw.svg';
import BigWin from '@/public/resultIcon/bigWin.svg';
import BigGone from '@/public/resultIcon/bigDraw.svg';
import BigMiss from '@/public/resultIcon/bigLose.svg';
import Fire from './img/hot.png';
import Star from './img/coin.png';
import style from './gameCard.module.scss';
import { useGuessDetailStore } from './guessDetailStore';
import Lose from '@/public/resultIcon/lose.svg';
import Win from '@/public/resultIcon/win.svg';

interface TagProps {
    type: 0 | 1 | 2 | 3;
    value: number;
}

function HighlightTag({ type, value }: TagProps) {
    if (value > 50) return null;
    //戰績標籤類別 0:週 1:月 2:季 3:連紅
    const periodMap = {
        0: '周',
        1: '月',
        2: '季'
    };
    if (type === 3)
        return (
            <Tag icon={<Image alt="" height={10} src={Fire} width={10} />} text={`${value}连红`} />
        );
    return <TagSplit isBlueBg={false} number={value} text={periodMap[type]} />;
}

interface GameCardProps {
    plan: ProGuess;
    onOpenPaidDialog: () => void;
    handleVIPUnlock: (gameId: number) => void;
}

const sortHotStreakFirst = (highlights: ProGuess['highlights']) => {
    const copyArray = [...highlights];
    copyArray.sort((a, b) => b.type - a.type);
    return copyArray;
};

function GameCard({ plan, onOpenPaidDialog, handleVIPUnlock }: GameCardProps) {
    const detail = useGuessDetailStore.use.detail();
    const unlockPrice = useGuessDetailStore.use.masterPlanPrice();
    const isVIP = useUserStore.use.memberSubscribeStatus().planId === 1;

    const sortTags = sortHotStreakFirst(plan.highlights);
    const iconMap = {
        WIN: <Win />,
        LOSE: <Lose />,
        DRAW: <Gone />
    };
    const resultIconMap = {
        WIN: <BigWin height="36px" width="36px" />,
        LOSE: <BigMiss height="36px" width="36px" />,
        DRAW: <BigGone height="36px" width="36px" />
    };
    const guessWayMap = { HOME: '主', AWAY: '客', OVER: '大', UNDER: '小' };

    const playWayLabel =
        plan.predictedType === 'HANDICAP' ? plan.handicapInChinese : plan.overUnderOdds;

    const handleButtonOnClick = (planId: number) => {
        if (isVIP) {
            handleVIPUnlock(planId);
        } else {
            onOpenPaidDialog();
        }
    };

    return (
        <div className={style.gameCard}>
            <div className={style.detail}>
                <Link
                    className={style.avatarLink}
                    href={`/master/memberAvatar/${plan.memberId}?status=guess`}
                >
                    <Avatar shadow src={plan.avatarPath === '0' ? '' : plan.avatarPath} />
                </Link>
                <div className={style.details}>
                    <span>{plan.memberName}</span>
                    <div className={style.tagsContainer}>
                        {sortTags.map(el => (
                            <HighlightTag key={el.id} type={el.type} value={el.value} />
                        ))}
                    </div>
                    <div className={style.league}>
                        {detail.homeTeamName} vs {detail.awayTeamName}
                    </div>
                    <ul className={style.ballList}>
                        {plan.records.map((result, idx) => (
                            <li key={idx}>{iconMap[result]}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={style.paid}>
                {plan.predictedPlay === 'LOCK' ? (
                    <>
                        <div
                            className={style.noPaid}
                            onClick={() => {
                                handleButtonOnClick(plan.guessId);
                            }}
                        >
                            {isVIP ? (
                                <span className={style.text}>查看</span>
                            ) : (
                                <>
                                    <Image
                                        alt="star"
                                        className={style.image}
                                        src={Star}
                                        width={14}
                                    />
                                    <span className={style.text}>{unlockPrice}</span>
                                </>
                            )}
                        </div>
                        <div className={style.play}>{playWayLabel}</div>
                    </>
                ) : (
                    <div className={style.hit}>
                        {plan.predictionResult !== 'NONE'
                            ? resultIconMap[plan.predictionResult]
                            : null}
                        <div className={style.play}>{playWayLabel}</div>
                        <div className={style.paidContent}>
                            <div className={style.play}>{guessWayMap[plan.predictedPlay]}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameCard;
