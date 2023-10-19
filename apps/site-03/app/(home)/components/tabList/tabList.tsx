import { Tabs } from 'ui';
import type { ReactNode } from 'react';
import style from './tabList.module.scss';

function TabList({ children }: { children: ReactNode }) {
    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    return (
        <div className={style.tabList}>
            <Tabs
                buttonRadius={tabStyle.buttonRadius}
                gap={tabStyle.gap}
                position="center"
                styling="underline"
                swiperOpen={tabStyle.swiperOpen}
            >
                {children}
            </Tabs>
        </div>
    );
}

export default TabList;
