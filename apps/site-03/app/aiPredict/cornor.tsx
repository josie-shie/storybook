import type { GetAiAnalyzeMatchResponse } from 'data-center';
import style from './aiTab.module.scss';
import IdeaIcon from './img/idea.svg';

interface CornorProps {
    match: GetAiAnalyzeMatchResponse;
}

function Cornor({ match }: CornorProps) {
    return (
        <div className={style.aiTab}>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <IdeaIcon />
                    <span>{match.homeChs}的策略</span>
                </div>
                <div className={style.content}>{match.homeTacticalPerspective}</div>
            </div>
            <div className={style.info}>
                <div className={style.titleLogo}>
                    <IdeaIcon />
                    <span>{match.awayChs}的策略</span>
                </div>
                <div className={style.content}>{match.awayTacticalPerspective}</div>
            </div>
        </div>
    );
}

export default Cornor;
