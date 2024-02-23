import type { GetPredicativeAnalysisMatch } from 'data-center';
import TeamLogo from '@/components/teamLogo/teamLogo';
import style from './aiTab.module.scss';

interface AnalyzeProps {
    match: GetPredicativeAnalysisMatch;
    // onUnlockArticle: (matchId: number) => void;
}

function Analyze({ match }: AnalyzeProps) {
    return (
        <div className={style.aiTab}>
            {/* <div className={style.detail}>
                    从像米克尔-阿尔特塔这样的战术思维角度来看，这场比赛对于双方来说都至关重要，特别是考虑到他们在比赛中的当前表现和排名。
                </div> */}
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <TeamLogo alt={match.homeChs} height={24} src={match.homeLogo} width={24} />
                    <span>{match.homeChs}</span>
                </div>
                <div className={style.content}>{match.homeStrategicAnalysis}</div>
            </div>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <TeamLogo alt={match.awayChs} height={24} src={match.awayLogo} width={24} />
                    <span>{match.awayChs}</span>
                </div>
                <div className={style.content}>{match.awayStrategicAnalysis}</div>
            </div>
        </div>
    );
}

export default Analyze;
