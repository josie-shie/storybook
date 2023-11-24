import { useState } from 'react';
import style from './userSwitch.module.scss';

function UserSwitch() {
    const [status, setStatus] = useState(true);

    return (
        <div className={style.userSwitch}>
            <span className={style.text}>仅显示当天参与用户</span>
            <div className={style.switch}>
                <input
                    checked={status}
                    id="switch"
                    onChange={() => {
                        setStatus(!status);
                    }}
                    type="checkbox"
                />
                <label htmlFor="switch">switch</label>
            </div>
        </div>
    );
}

export default UserSwitch;
