import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import style from './notification.module.scss';

interface SlideTransitionProps {
    show: boolean;
    children?: ReactNode;
    autoCloseTime?: number;
    onClose: () => void;
}

function SlideTransition({ autoCloseTime, children, show = false, onClose }: SlideTransitionProps) {
    const [closeTime, setCloseTime] = useState(3000);

    const entranceTransition = {
        translateY: ['0%', '-30%', '0%'],
        opacity: [0, 1, 1],
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    };

    const exitTransition = {
        translateY: ['0%', '-30%', '100%'],
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: 'easeIn'
        }
    };

    useEffect(() => {
        autoCloseTime && setCloseTime(autoCloseTime);
    }, [autoCloseTime]);

    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (show) {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }

            timerRef.current = window.setTimeout(() => {
                onClose();
            }, closeTime);
        }

        return () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, [show, closeTime, onClose]);

    return (
        <AnimatePresence>
            {show ? (
                <motion.div
                    animate={entranceTransition}
                    className={style.slideTransition__position}
                    exit={exitTransition}
                    initial={{ translateY: '-100%', opacity: 0 }}
                >
                    {children}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default SlideTransition;
