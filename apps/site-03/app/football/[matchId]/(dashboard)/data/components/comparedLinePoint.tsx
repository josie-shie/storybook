import style from './comparedLinePoint.module.scss';

function ComparedLinePoint({ pointList }: { pointList: string[] }) {
    return (
        <div className={style.comparedLinePoint}>
            {pointList.map(
                (point, idx) =>
                    point.length > 0 && (
                        <div
                            className={`${style.point} ${style[point]}`}
                            key={`${point}_${idx.toString()}`}
                        />
                    )
            )}
        </div>
    );
}

export default ComparedLinePoint;
