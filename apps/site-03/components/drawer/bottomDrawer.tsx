import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import type { ReactNode } from 'react';
import style from './bottomDrawer.module.scss';

function BottomDrawer({
    isOpen,
    onOpen,
    onClose,
    children,
    propsStyle = {},
    topLineDisplay = 'initial',
    swipeAreaWidth
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    children: ReactNode;
    propsStyle?: React.CSSProperties;
    topLineDisplay?: string;
    swipeAreaWidth?: number; // 在屏幕边缘多少可以被滑动出來
}) {
    return (
        <SwipeableDrawer
            PaperProps={{
                style: {
                    ...propsStyle,
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px'
                }
            }}
            anchor="bottom"
            onClose={onClose}
            onOpen={onOpen}
            open={isOpen}
            swipeAreaWidth={swipeAreaWidth ? swipeAreaWidth : 20} // 組件預設是20
            transitionDuration={{ enter: 300, exit: 200 }}
        >
            <div className={`${style.topLine}`} style={{ display: topLineDisplay }} />
            {children}
        </SwipeableDrawer>
    );
}

export default BottomDrawer;
