import style from './bodan.module.scss';

const scores = [
    { score: '1-0', value: 55 },
    { score: '0-0', value: 55 },
    { score: '0-1', value: 100 },
    { score: '2-0', value: 60 },
    { score: '1-1', value: 55 },
    { score: '0-2', value: 55 },
    { score: '2-1', value: 60 },
    { score: '2-2', value: 80 },
    { score: '1-2', value: 60 },
    { score: '3-0', value: 60 },
    { score: '3-3', value: 70 },
    { score: '0-3', value: 60 },
    { score: '3-1', value: 60 },
    { score: '4-4', value: 60 },
    { score: '1-3', value: 60 },
    { score: '3-2', value: 55 },
    { score: '其他', value: 0 },
    { score: '2-3', value: 90 },
    { score: '4-0', value: 80 },
    { score: '', value: null },
    { score: '0-4', value: 55 },
    { score: '4-1', value: 55 },
    { score: '', value: null },
    { score: '1-4', value: 55 },
    { score: '4-2', value: 55 },
    { score: '', value: null },
    { score: '2-4', value: 0 },
    { score: '4-3', value: 55 },
    { score: '', value: null },
    { score: '3-4', value: 55 }
];

interface ItemType {
    score: string;
    value: number | null;
}

type ValueCount = Record<number, number>;

function BodanItem({ item, highlight }: { item: ItemType; highlight: boolean }) {
    return (
        <div className={style.cell}>
            <span
                className={`${style.score} ${!item.score ? style.nulls : ''} ${
                    highlight ? style.highlight : ''
                }`}
            >
                {item.score}
            </span>
            <span
                className={`${style.value} ${item.value === null ? style.nulls : ''} ${
                    highlight ? style.highlight : ''
                }`}
            >
                <span>{item.score ? item.value : ''}</span>
            </span>
        </div>
    );
}

function Bodan() {
    const valueCounts = scores.reduce<ValueCount>((accumulate, item) => {
        if (item.value !== null) {
            accumulate[item.value] = (accumulate[item.value] || 0) + 1;
        }
        return accumulate;
    }, {});

    const sortedValues = Object.keys(valueCounts)
        .map(Number)
        .sort((a, b) => b - a);

    const highlightValues: number[] = [];

    if (valueCounts[sortedValues[0]] >= 3) {
        highlightValues.push(sortedValues[0]);
    } else {
        highlightValues.push(sortedValues[0], sortedValues[1]);
        if (valueCounts[sortedValues[0]] + valueCounts[sortedValues[1]] < 3) {
            highlightValues.push(sortedValues[2]);
        }
    }

    return (
        <div className={style.bodan}>
            <div className={style.title}>
                <div>全场波胆</div>
                <div>点击场数可直达赛事</div>
            </div>
            <div className={style.bodanScore}>
                {scores.map((item, index) => (
                    <BodanItem
                        highlight={item.value !== null && highlightValues.includes(item.value)}
                        item={item}
                        key={`score_${index.toString()}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Bodan;
