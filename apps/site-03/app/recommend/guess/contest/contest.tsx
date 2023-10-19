import Rule from '../components/rule/rule';
import style from './contest.module.scss';

function Contest() {
    return (
        <div className={style.contest}>
            <div className={style.control}>
                <div className={style.right}>
                    <Rule />
                </div>
            </div>
        </div>
    );
}

export default Contest;
