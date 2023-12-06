import Image from 'next/image';
import Fire from './img/fire.png';
import Win from './img/win.png';
import Lose from './img/lose.png';
import Gone from './img/gone.png';
import BigWin from './img/bigWin.png';
import BigLose from './img/bigLose.png';
import BigGone from './img/bigGone.png';
import Star from './img/star.png';
import style from './gameCard.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

interface MasterPlan {
    id: number; // 方案id
    avatar: string; // 頭像
    name: string; // 暱稱
    hotStreak: number; // 連紅次數
    ranking: number; // 月榜排名
    homeTeam: string; // 主隊名
    awayTeam: string; // 客隊名
    unlock: boolean; // 是否已解鎖
    unlockPrice: number; // 解鎖價格
    history: ('win' | 'lose' | 'draw')[]; // 歷史戰績
    guess: 'home' | 'away' | 'big' | 'small'; // 競猜方向
    result?: 'win' | 'lose' | 'draw'; // 競猜結果
    guessValue: number; // 讓分
}

interface GameCardProps {
    plan: MasterPlan;
    onOpenPaidDialog: () => void;
}

function GameCard({ plan, onOpenPaidDialog }: GameCardProps) {
    const iconMap = {
        win: <Image alt="winIcon" src={Win} width={18} />,
        lose: <Image alt="loseIcon" src={Lose} width={18} />,
        draw: <Image alt="goneIcon" src={Gone} width={18} />
    };
    const resultIconMap = {
        win: <Image alt="" height={36} src={BigWin} width={36} />,
        lose: <Image alt="" height={36} src={BigLose} width={36} />,
        draw: <Image alt="" height={36} src={BigGone} width={36} />
    };
    const guessWayMap = { home: '主', away: '客', big: '大', small: '小' };
    const showHotStreak = plan.hotStreak > 4; // 邏輯待確認
    const showRanking = plan.ranking < 50; // 邏輯待確認

    return (
        <div className={style.gameCard}>
            <div className={style.detail}>
                <Avatar />
                <div className={style.details}>
                    <span>{plan.name}</span>
                    {showHotStreak ? (
                        <Tag
                            icon={<Image alt="" src={Fire} width={8} />}
                            text={`${plan.hotStreak}连红`}
                        />
                    ) : null}
                    {showRanking ? <Tag background="#4489ff" text={`月榜${plan.ranking}`} /> : null}
                    <div className={style.league}>
                        {plan.homeTeam} vs {plan.awayTeam}
                    </div>
                    <ul className={style.ballList}>
                        {plan.history.map((result, idx) => (
                            <li key={idx}>{iconMap[result]}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={style.paid}>
                {plan.unlock ? (
                    <div className={style.hit}>
                        {plan.result ? resultIconMap[plan.result] : null}
                        <div className={style.play}>一球/球半</div>
                        <div className={style.paidContent}>
                            <div className={style.play}>{guessWayMap[plan.guess]}</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={style.noPaid} onClick={onOpenPaidDialog}>
                            <Image alt="star" className={style.image} src={Star} width={14} />
                            <span className={style.text}>{plan.unlockPrice}元</span>
                        </div>
                        <div className={style.play}>一球/球半</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default GameCard;
