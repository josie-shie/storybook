import Image from 'next/image';
import type { ProGuess } from 'data-center';
import Link from 'next/link';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import { useUserStore } from '@/store/userStore';
import Fire from './img/hot.png';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Gone from './img/gone.png';
import Star from './img/coin.png';
import BigWin from './img/bigWin.png';
import BigLose from './img/bigLose.png';
import BigGone from './img/bigGone.png';
import style from './gameCard.module.scss';
import { useGuessDetailStore } from './guessDetailStore';

interface TagProps {
    type: 0 | 1 | 2 | 3;
    value: number;
}

function HighlightTag({ type, value }: TagProps) {
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
}

const sortHotStreakFirst = (highlights: ProGuess['highlights']) => {
    const copyArray = [...highlights];
    copyArray.sort((a, b) => b.type - a.type);
    return copyArray;
};

function GameCard({ plan, onOpenPaidDialog }: GameCardProps) {
    const detail = useGuessDetailStore.use.detail();
    const unlockPrice = useGuessDetailStore.use.masterPlanPrice();
    const isVIP = useUserStore.use.memberSubscribeStatus().planId === 1;

    const sortTags = sortHotStreakFirst(plan.highlights);
    const iconMap = {
        WIN: <Image alt="winIcon" src={Win} width={18} />,
        LOSE: <Image alt="loseIcon" src={Lose} width={18} />,
        DRAW: <Image alt="goneIcon" src={Gone} width={18} />
    };
    const resultIconMap = {
        WIN: <Image alt="" height={36} src={BigWin} width={36} />,
        LOSE: <Image alt="" height={36} src={BigLose} width={36} />,
        DRAW: <Image alt="" height={36} src={BigGone} width={36} />
    };
    const guessWayMap = { HOME: '主', AWAY: '客', OVER: '大', UNDER: '小' };

    const playWayLabel =
        plan.predictedType === 'HANDICAP' ? plan.handicapInChinese : plan.overUnderOdds;

    return (
        <div className={style.gameCard}>
            <div className={style.detail}>
                <Link
                    className={style.avatarLink}
                    href={`/master/masterAvatar/${plan.memberId}?status=analysis`}
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
                        <div className={style.noPaid} onClick={onOpenPaidDialog}>
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
                        <div className={style.play}>一球/球半</div>
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
