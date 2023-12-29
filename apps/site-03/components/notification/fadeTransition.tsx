import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import style from './notification.module.scss';

interface FadeTransitionProps {
    show: boolean;
    children?: ReactNode;
    autoCloseTime?: number;
    onClose: () => void;
}

function FadeTransition({ autoCloseTime, children, show = false, onClose }: FadeTransitionProps) {
    const [closeTime, setCloseTime] = useState(1000);

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
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
                    animate="visible"
                    className={style.slideTransition__position}
                    exit="hidden"
                    initial="hidden"
                    transition={{ duration: 0.3 }} // 动画持续时间
                    variants={variants}
                >
                    {children}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default FadeTransition;
