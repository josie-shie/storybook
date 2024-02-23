import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import TeamLogo from '@/components/teamLogo/teamLogo';
import style from './comparedTeamBar.module.scss';

function ComparedTeamBar() {
    const matchDetail = useContestDetailStore.use.matchDetail();

    return (
        <div className={style.comparedTeamBar}>
            <div className={`${style.team} ${style.home}`}>
                <TeamLogo
                    alt={matchDetail.homeChs}
                    className={style.teamLogo}
                    height={24}
                    src={matchDetail.homeLogo}
                    width={24}
                />
                <p className={style.teamName}>{matchDetail.homeChs}</p>
            </div>
            <div className={`${style.team} ${style.away}`}>
                <p className={style.teamName}>{matchDetail.awayChs}</p>
                <TeamLogo
                    alt={matchDetail.awayChs}
                    className={style.teamLogo}
                    height={24}
                    src={matchDetail.awayLogo}
                    width={24}
                />
            </div>
        </div>
    );
}

export default ComparedTeamBar;
