import type { GetPredicativeAnalysisMatch } from 'data-center';
import IdeaIcon from '../../(list)/img/idea.svg';
import style from './aiTab.module.scss';

interface CornorProps {
    match: GetPredicativeAnalysisMatch;
    // onUnlockArticle: (matchId: number) => void;
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
