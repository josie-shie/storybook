'use client';
import { useAnalyticsResultStore } from '../../analysisResultStore';
import style from './bodan.module.scss';

function Bodan() {
    const analysisRecord = useAnalyticsResultStore.use.analysisResultData();

    const scores = [
        { score: '1-0', value: analysisRecord.exactGoal.goalRange1To0.length },
        { score: '0-1', value: analysisRecord.exactGoal.goalRange0To1.length },
        { score: '0-0', value: analysisRecord.exactGoal.goalRange0To0.length },
        { score: '2-0', value: analysisRecord.exactGoal.goalRange2To0.length },
        { score: '0-2', value: analysisRecord.exactGoal.goalRange0To2.length },
        { score: '1-1', value: analysisRecord.exactGoal.goalRange1To1.length },
        { score: '2-1', value: analysisRecord.exactGoal.goalRange2To1.length },
        { score: '1-2', value: analysisRecord.exactGoal.goalRange1To2.length },
        { score: '2-2', value: analysisRecord.exactGoal.goalRange2To2.length },
        { score: '3-0', value: analysisRecord.exactGoal.goalRange3To0.length },
        { score: '0-3', value: analysisRecord.exactGoal.goalRange0To3.length },
        { score: '3-3', value: analysisRecord.exactGoal.goalRange3To3.length },
        { score: '3-1', value: analysisRecord.exactGoal.goalRange3To1.length },
        { score: '1-3', value: analysisRecord.exactGoal.goalRange1To3.length },
        { score: '4-4', value: analysisRecord.exactGoal.goalRange4To4.length },
        { score: '3-2', value: analysisRecord.exactGoal.goalRange3To2.length },
        { score: '2-3', value: analysisRecord.exactGoal.goalRange2To3.length },
        { score: '其他', value: analysisRecord.exactGoal.others.length },
        { score: '4-0', value: analysisRecord.exactGoal.goalRange4To0.length },
        { score: '0-4', value: analysisRecord.exactGoal.goalRange0To4.length },
        { score: '', value: null },
        { score: '4-1', value: analysisRecord.exactGoal.goalRange4To1.length },
        { score: '1-4', value: analysisRecord.exactGoal.goalRange1To4.length },
        { score: '', value: null },
        { score: '4-2', value: analysisRecord.exactGoal.goalRange4To2.length },
        { score: '2-4', value: analysisRecord.exactGoal.goalRange2To4.length },
        { score: '', value: null },
        { score: '4-3', value: analysisRecord.exactGoal.goalRange4To3.length },
        { score: '3-4', value: analysisRecord.exactGoal.goalRange3To4.length },
        { score: '', value: null }
    ];

    return (
        <div className={style.bodan}>
            {scores.map((item, index) => (
                <div className={style.cell} key={`score_${index.toString()}`}>
                    <span className={`${style.score} ${!item.score ? style.nulls : ''}`}>
                        {item.score}
                    </span>
                    <span className={`${style.value} ${!item.value ? style.nulls : ''}`}>
                        <span>{item.value}</span>
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Bodan;
