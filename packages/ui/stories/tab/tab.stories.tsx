import type { Meta } from '@storybook/react';
import { IconChevronDown, IconMessageCircle } from '@tabler/icons-react';
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
    styling: 'text';
    position: 'center';
    gap: 12;
    swiperOpen: true;
    background: '#1c1c1d';
    textColor: '#fff';
    fontSize: 14;
    buttonRadius: 50;
    buttonColor: '#2d2d2d';
}): JSX.Element {
    return (
        <Tabs
            background={args.background}
            buttonColor={args.buttonColor}
            buttonRadius={args.buttonRadius}
            fontSize={args.fontSize}
            gap={args.gap}
            position={args.position}
            styling={args.styling}
            swiperOpen={args.swiperOpen}
            textColor={args.textColor}
        >
            <Tab label="Tab 1" leftSection={<IconChevronDown size="1rem" />}>
                <div className={style.tabContentForTest}>Content for Tab 1</div>
            </Tab>
            <Tab label="Tab 2" rightSection={<IconMessageCircle size="1rem" />}>
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
