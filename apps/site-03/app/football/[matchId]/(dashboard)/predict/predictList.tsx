import PredictCard from './predictCard';
import { usePredictStore } from './predictStore';
import style from './predict.module.scss';

function PredictList() {
    const predictList = usePredictStore.use.predictList();

    return (
        <div className={style.predictList}>
            {predictList.map(predict => {
                return <PredictCard key={predict.mentorId} predictInfo={predict} />;
            })}
        </div>
    );
}

export default PredictList;
