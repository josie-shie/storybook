import Rule from '../components/rule/rule';
import ContestList from '../components/contestList/contestList';
import style from './contest.module.scss';

function Contest() {
    return (
        <div className={style.contest}>
            <div className={style.control}>
                <div className={style.right}>
                    <Rule />
                </div>
            </div>
            <ContestList />
        </div>
    );
}

export default Contest;
