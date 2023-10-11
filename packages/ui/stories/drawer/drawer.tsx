import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import style from './drawer.module.scss';

interface DrawerProps {
    /**
     * Is this drawer appear?
     */
    isOpen: boolean;
    /**
     * Drawer content
     */
    children: ReactElement;
    /**
     * The location where this component should appear
     */
    position?: 'right' | 'left';
    /**
     * Drawer content padding
     */
    padding?: string;
    /**
     * Cover background color
     */
    coverBackground?: string;
    /**
     *  Close handler
     */
    onClose: () => void;
}

function Drawer({
    children,
    isOpen,
    position = 'right',
    padding = '16px 24px',
    coverBackground,
    onClose
}: DrawerProps) {
    const [showDrawer, setShowDrawer] = useState(isOpen);
    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setShowDrawer(true);
        } else {
            const timer = setTimeout(() => {
                setShowDrawer(false);
            }, 600);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isOpen]);

    return (
        <div className={`${style.drawerContainer} ${!showDrawer ? style.hide : ''}`}>
            <div
                className={`${style.coverClosed} ${isOpen ? style.coverOpened : ''}`}
                onClick={handleClose}
                style={{ backgroundColor: coverBackground || '#000' }}
            />
            {position === 'right' ? (
                <div
                    className={`${style.drawerPanelRight} ${isOpen ? style.drawerOpenedRight : ''}`}
                    style={{ padding }}
                >
                    {children}
                </div>
            ) : (
                <div
                    className={`${style.drawerPanelLeft} ${isOpen ? style.drawerOpenedLeft : ''}`}
                    style={{ padding }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export { Drawer };
