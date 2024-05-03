import Image from 'next/image';
import type { GetPredicativeAnalysisMatch } from 'data-center';
import Link from 'next/link';
import defaultTeamLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';
import { useFormattedTime } from '@/hooks/useFormattedTime';
import Hit from '../../(list)/img/aiHit.svg';
import Miss from '../../(list)/img/aiMiss.svg';
import style from './historyCard.module.scss';

function TeamDisplay({ name, logo, value }: { name: string; logo: string; value: number }) {
    return (
        <div className={style.team}>
            <div className={style.teamName}>
                <Image
                    alt=""
                    height={20}
                    src={logo === '0' ? defaultTeamLogo.src : logo}
                    width={20}
                />
                {name}
            </div>
            <span>{value}</span>
        </div>
    );
}

function HistoryDisplayContent({ item }: { item: GetPredicativeAnalysisMatch }) {
    const compareResult = (predictMatchResult: number, realMatchResult: number) => {
        if (!realMatchResult) return;
        if (predictMatchResult === 0) {
            if (realMatchResult === 3) return <Hit />;
            if ([1, 2].includes(realMatchResult)) return <Miss />;
        }
        if (predictMatchResult === 1) {
            if (realMatchResult === 1) return <Hit />;
            if (realMatchResult === 2) return <Miss />;
            if (realMatchResult === 3) return <Miss />;
        } else if (predictMatchResult === 2) {
            if (realMatchResult === 1) return <Miss />;
            if (realMatchResult === 2) return <Hit />;
            if (realMatchResult === 3) return <Miss />;
        }
    };

    return (
        <Link className={style.historyRow} href={`/aiPredict/historyDetail/${item.matchId}`}>
            <div className={style.top}>
                <div>
                    <span className={style.league} style={{ color: `${item.color}` }}>
                        {item.leagueChs}
                    </span>
                    <span>
                        {useFormattedTime({
                            timeStamp: item.matchTime,
                            formattedString: 'HH:mm'
                        })}
                    </span>
                </div>
                <span>{item.purchaseCount}人解鎖</span>
            </div>
            <div className={style.bottom}>
                <div className={style.teamBox}>
                    {TeamDisplay({
                        name: item.homeChs,
                        logo: item.homeLogo,
                        value: item.homeScore
                    })}
                    {TeamDisplay({
                        name: item.awayChs,
                        logo: item.awayLogo,
                        value: item.awayScore
                    })}
                </div>
                <div className={style.icon}>
                    {compareResult(item.predictMatchResult, item.realMatchResult)}
                </div>
            </div>
        </Link>
    );
}

export default HistoryDisplayContent;
