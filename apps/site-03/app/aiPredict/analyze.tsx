import type { GetAiAnalyzeMatchResponse } from 'data-center';
import style from './aiTab.module.scss';
import TeamHomeIcom from './img/teamHome.svg';
import TeamAwayIcon from './img/teamAway.svg';

interface AnalyzeProps {
    match: GetAiAnalyzeMatchResponse;
}

function Analyze({ match }: AnalyzeProps) {
    return (
        <div className={style.aiTab}>
            {/* <div className={style.detail}>
                从像米克尔-阿尔特塔这样的战术思维角度来看，这场比赛对于双方来说都至关重要，特别是考虑到他们在比赛中的当前表现和排名。
            </div> */}
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <TeamHomeIcom />
                    <span>{match.homeChs}</span>
                </div>
                <div className={style.content}>{match.homeStrategicAnalysis}</div>
            </div>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <TeamAwayIcon />
                    <span>{match.awayChs}</span>
                </div>
                <div className={style.content}>{match.awayStrategicAnalysis}</div>
            </div>
        </div>
    );
}

export default Analyze;
