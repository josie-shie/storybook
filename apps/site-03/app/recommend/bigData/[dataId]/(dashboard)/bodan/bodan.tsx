import style from './bodan.module.scss';

function Bodan() {
    const scores = [
        { score: '1-0', value: 55 },
        { score: '0-1', value: 55 },
        { score: '0-0', value: 55 },
        { score: '2-0', value: 55 },
        { score: '0-2', value: 55 },
        { score: '1-1', value: 55 },
        { score: '2-1', value: 55 },
        { score: '1-2', value: 55 },
        { score: '2-2', value: 55 },
        { score: '3-0', value: 55 },
        { score: '0-3', value: 55 },
        { score: '3-3', value: 55 },
        { score: '3-1', value: 55 },
        { score: '1-3', value: 55 },
        { score: '4-4', value: 55 },
        { score: '3-2', value: 55 },
        { score: '2-3', value: 55 },
        { score: '其他', value: 55 },
        { score: '4-0', value: 55 },
        { score: '0-4', value: 55 },
        { score: '', value: null },
        { score: '4-1', value: 55 },
        { score: '1-4', value: 55 },
        { score: '', value: null },
        { score: '4-2', value: 55 },
        { score: '2-4', value: 55 },
        { score: '', value: null },
        { score: '4-3', value: 55 },
        { score: '3-4', value: 55 },
        { score: '', value: null }
    ];
    return (
        <div className={style.bodan}>
            {scores.map(item => (
                <div className={style.cell} key={item.score}>
                    <span className={`${style.score} ${!item.score ? style.nulls : ''}`}>
                        {item.score}
                    </span>
                    <span className={`${style.value} ${!item.value ? style.nulls : ''}`}>
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Bodan;
