import type { ReactNode } from 'react';
import { Tab, Tabs } from 'ui';
import style from './tabList.module.scss';

interface Tab {
    label: string;
    value: string;
    content: ReactNode;
}

interface TabListProps {
    tabList: Tab[];
}

function TabList({ tabList }: TabListProps) {
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
                {tabList.map(tab => {
                    return (
                        <Tab key={tab.value} label={tab.label}>
                            {tab.content}
                        </Tab>
                    );
                })}
            </Tabs>
        </div>
    );
}

export default TabList;
