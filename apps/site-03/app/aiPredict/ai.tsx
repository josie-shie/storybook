import type { GetAiAnalyzeMatchResponse } from 'data-center';
import style from './aiTab.module.scss';

interface AiProps {
    match: GetAiAnalyzeMatchResponse;
}

function Ai({ match }: AiProps) {
    return (
        <div className={style.aiTab}>
            <div className={style.info}>
                <div className={style.title}>预测</div>
                <div className={style.content}>{match.predict}</div>
            </div>
            <div className={style.info}>
                <div className={style.title}>总结</div>
                <div className={style.content}>{match.summery}</div>
            </div>
        </div>
    );
}

export default Ai;
