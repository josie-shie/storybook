'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import React, { useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context';
import { AnimatePresence, motion } from 'framer-motion';
import { creatMatchFilterStore } from '../analysis/matchFilterStore';
import { creatHintsFormStore } from '../analysis/hintsFormStore';
import style from './layout.module.scss';

const layoutTransitionVariants = {
    initial: { transform: 'translateX(0)', transition: { duration: 0.2 } },
    animate: { transform: 'translateX(0)', transition: { duration: 0.2 } },
    exit: { transform: 'translateX(0)', transition: { duration: 0.2 } }
};

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

function FrozenRouter({ children }: { children: ReactNode }) {
    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;

    return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}

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
        <AnimatePresence mode="popLayout">
            {params !== '/bigData/longDragon' ? (
                <motion.div
                    animate="animate"
                    className={style.layout}
                    exit="exit"
                    initial="initial"
                    key={params}
                    variants={pageTransitionVariants}
                >
                    <FrozenRouter>{children}</FrozenRouter>
                </motion.div>
            ) : (
                <motion.div
                    animate="animate"
                    exit="exit"
                    initial="initial"
                    key="/bigData/longDragon"
                    variants={layoutTransitionVariants}
                >
                    <FrozenRouter>{children}</FrozenRouter>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LongDragonLayout;
