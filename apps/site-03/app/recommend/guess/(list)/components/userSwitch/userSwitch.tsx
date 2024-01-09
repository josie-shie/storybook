import { usePathname } from 'next/navigation';
import { useRankStore } from '../../rankStore';
import { useMasterRankStore } from '../../masterRank/masterRankStore';
import style from './userSwitch.module.scss';

function UserSwitch() {
    const pathName = usePathname();
    const isMasterRank = pathName.includes('/masterRank');

    const onlyShowToday = isMasterRank
        ? useMasterRankStore.use.onlyShowToday()
        : useRankStore.use.onlyShowToday();
    const setOnlyShowToday = isMasterRank
        ? useMasterRankStore.use.setOnlyShowToday()
        : useRankStore.use.setOnlyShowToday();

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
