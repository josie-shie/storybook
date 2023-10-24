import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import type { ReactNode } from 'react';
import style from './bottomDrawer.module.scss';

function BottomDrawer({
    isOpen,
    onOpen,
    onClose,
    children
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    children: ReactNode;
}) {
    return (
        <SwipeableDrawer
            anchor="bottom"
            onClose={onClose}
            onOpen={onOpen}
            open={isOpen}
            transitionDuration={{ enter: 300, exit: 200 }}
        >
            <div className={style.topLine} />
            {children}
        </SwipeableDrawer>
    );
}

export default BottomDrawer;
