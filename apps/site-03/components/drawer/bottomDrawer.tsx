import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useEffect, useState } from 'react';
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
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(display-mode: fullscreen)');
        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsFullscreen(e.matches);
        };
        mediaQuery.addEventListener('change', handleMediaChange);
        handleMediaChange(mediaQuery as MediaQueryListEvent);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);
    return (
        <SwipeableDrawer
            PaperProps={{
                style: {
                    ...propsStyle,
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    paddingBottom: isFullscreen ? '21px' : '0'
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
