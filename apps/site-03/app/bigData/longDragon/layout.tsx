'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { creatMatchFilterStore } from '../analysis/matchFilterStore';
import { creatHintsFormStore } from '../analysis/hintsFormStore';
import style from './layout.module.scss';

const pageTransitionVariants = {
    initial: {
        transform: 'translateX(100%)',
        transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 0.2 }
    },
    animate: {
        transform: 'translateX(0)',
        transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 0.2 }
    },
    exit: {
        transform: 'translateX(100%)',
        transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 0.2 }
    }
};

function LongDragonLayout({ children }: { children: ReactNode }) {
    const params = usePathname();

    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });
    creatHintsFormStore({
        handicapTips: []
    });
    return (
        <AnimatePresence>
            <motion.div
                animate="animate"
                className={style.layout}
                exit="exit"
                initial="initial"
                key={params}
                variants={pageTransitionVariants}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default LongDragonLayout;
