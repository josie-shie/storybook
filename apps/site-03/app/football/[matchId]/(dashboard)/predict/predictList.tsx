import PredictCard from './predictCard';
import { usePredictStore } from './predictStore';
import style from './predict.module.scss';
import NoData from '@/components/baseNoData/noData';

function PredictList() {
    const predictList = usePredictStore.use.predictList();

    return (
        <>
            {predictList.length > 0 ? (
                <div className={style.predictList}>
                    {predictList.map(predict => {
                        return <PredictCard key={predict.mentorId} predictInfo={predict} />;
                    })}
                </div>
            ) : (
                <NoData />
            )}
        </>
    );
}

export default PredictList;
