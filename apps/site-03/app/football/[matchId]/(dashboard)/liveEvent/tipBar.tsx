import style from './tipBar.module.scss';
import { eventStatusList } from './eventStatusMap';

function TipBar() {
    const tipList = eventStatusList.slice(0, 13);
    return (
        <ul className={style.tipBar}>
            {tipList.map(list => (
                <li className={style.tip} key={list.id}>
                    {list.image}
                    <p className={style.label}>{list.label}</p>
                </li>
            ))}
        </ul>
    );
}

export default TipBar;
