import type { Meta } from '@storybook/react';
import { Tabs, Tab } from './tab';
import style from './tab.module.scss';

const meta: Meta<typeof Tabs> = {
    title: 'Example/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;

export function Default(args: {
    tabHeaderStyle: 'text';
    tabHeaderPosition: 'center';
    tabHeaderGap: 12;
    tabsSwiper: true;
    tabBackground: '#1c1c1d';
    tabHeaderColor: '#fff';
    tabHeaderBgColor: '#2d2d2d';
}): JSX.Element {
    return (
        <Tabs
            tabBackground={args.tabBackground}
            tabHeaderBgColor={args.tabHeaderBgColor}
            tabHeaderColor={args.tabHeaderColor}
            tabHeaderGap={args.tabHeaderGap}
            tabHeaderPosition={args.tabHeaderPosition}
            tabHeaderStyle={args.tabHeaderStyle}
            tabsSwiper={args.tabsSwiper}
        >
            <Tab label="Tab 1">
                <div className={style.tabContentForTest}>Content for Tab 1</div>
            </Tab>
            <Tab label="Tab 2">
                <div className={style.tabContentForTest}>Content for Tab 2</div>
            </Tab>
            <Tab label="Tab 3">
                <div className={style.tabContentForTest}>Content for Tab 3</div>
            </Tab>
            <Tab label="Tab 4">
                <div className={style.tabContentForTest}>Content for Tab 4</div>
            </Tab>
        </Tabs>
    );
}
