import { useRankStore } from '../../rank/rankStore';
import style from './userSwitch.module.scss';

function UserSwitch() {
    const onlyShowToday = useRankStore.use.onlyShowToday();
    const setOnlyShowToday = useRankStore.use.setOnlyShowToday();

    return (
        <div className={style.userSwitch}>
            <span className={style.text}>仅显示当天参与用户</span>
            <div className={style.switch}>
                <input
                    checked={onlyShowToday}
                    id="switch"
                    onChange={() => {
                        setOnlyShowToday(!onlyShowToday);
                    }}
                    type="checkbox"
                />
                <label htmlFor="switch">switch</label>
            </div>
        </div>
    );
}

export default UserSwitch;
