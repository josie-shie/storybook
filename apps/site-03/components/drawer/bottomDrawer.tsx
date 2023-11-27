import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import type { ReactNode } from 'react';
import style from './bottomDrawer.module.scss';

function BottomDrawer({
    isOpen,
    onOpen,
    onClose,
    children,
    propsStyle = {
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
    },
    topLineDisplay = 'initial'
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    children: ReactNode;
    propsStyle?: React.CSSProperties;
    topLineDisplay?: string;
}) {
    return (
        <SwipeableDrawer
            PaperProps={{
                style: propsStyle
            }}
            anchor="bottom"
            onClose={onClose}
            onOpen={onOpen}
            open={isOpen}
            transitionDuration={{ enter: 300, exit: 200 }}
        >
            <div className={`${style.topLine}`} style={{ display: topLineDisplay }} />
            {children}
        </SwipeableDrawer>
    );
}

export default BottomDrawer;
