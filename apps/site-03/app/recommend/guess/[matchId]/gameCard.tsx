import { useMemo } from 'react';
import Image from 'next/image';
import Fire from './img/fire.png';
import Win from './img/win.svg';
import Lose from './img/lose.svg';
import Star from './img/star.svg';
import Hit from './img/hit.svg';
import style from './gameCard.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

interface GameCardProps {
    name: string;
    text: string;
    league: string;
    globalUnlock: boolean;
    localIsUnlocked: boolean;
    onOpenPaidDialog: () => void;
}

function GameCard({
    name,
    text,
    league,
    globalUnlock,
    localIsUnlocked,
    onOpenPaidDialog
}: GameCardProps) {
    const isContentUnlocked = globalUnlock || localIsUnlocked;

    // 假的走勢球
    const randomResult = () => {
        const outcomes = [
            { id: 'win', component: <Win /> },
            { id: 'lose', component: <Lose /> }
        ];
        return outcomes[Math.floor(Math.random() * outcomes.length)];
    };

    const results = useMemo(
        () =>
            Array(10)
                .fill(0)
                .map(() => randomResult()),
        []
    );

    const tagProps = text.includes('连红')
        ? { icon: <Image alt="" src={Fire} width={8} />, text }
        : { icon: undefined, text, background: '#4489ff' };

    return (
        <div className={style.gameCard}>
            <div className={style.detail}>
                <Avatar />
                <div className={style.details}>
                    <span>{name}</span>
                    <Tag {...tagProps} />
                    <div className={style.league}>{league}</div>
                    <ul className={style.ballList}>
                        {results.map(result => (
                            <li key={result.id}>{result.component}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={style.paid}>
                {isContentUnlocked ? (
                    <div className={style.hit}>
                        <Hit />
                        <div className={style.play}>一球/球半</div>
                        <div className={style.paidContent}>
                            <div className={style.play}>小</div>
                            <div className={style.result}>勝</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={style.play}>一球/球半</div>
                        <div className={style.noPaid} onClick={onOpenPaidDialog}>
                            <Star className={style.image} />
                            <span className={style.text}>20元</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default GameCard;
