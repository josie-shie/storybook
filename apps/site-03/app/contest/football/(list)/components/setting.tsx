import Switch from '@mui/material/Switch';
import { useState } from 'react';
import style from './setting.module.scss';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function Setting({
    isOpen,
    onOpen,
    onClose
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const [openTip, setOpenTip] = useState(false);
    const [openSound, setOpenSound] = useState(false);

    return (
        <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <div className={style.setting}>
                <div className={style.topLine} />
                <h2>比賽設置</h2>
                <ul>
                    <li className={style.item}>
                        <span>进球提示</span>
                        <span>
                            <Switch
                                checked={openTip}
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={event => {
                                    setOpenTip(event.target.checked);
                                }}
                            />
                        </span>
                    </li>
                    <li className={style.item}>
                        <span>进球声音</span>
                        <span>
                            <Switch
                                checked={openSound}
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={event => {
                                    setOpenSound(event.target.checked);
                                }}
                            />
                        </span>
                    </li>
                </ul>
            </div>
        </BottomDrawer>
    );
}

export default Setting;
