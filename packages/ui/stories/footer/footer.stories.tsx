import type { Meta, StoryObj } from '@storybook/react';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import { useState } from 'react';
import type { FooterProps } from './footer';
import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
    title: 'Example/Footer',
    component: Footer,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        bgColor: { control: 'color' },
        defaultColor: { control: 'color' },
        activeColor: { control: 'color' }
    }
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Normal: Story = {
    args: {},
    render: args => <NormalComponent {...args} />
};

function NormalComponent(args: FooterProps) {
    const menuList = [
        {
            label: '首頁',
            icon: <CallToActionIcon />,
            value: 'index1'
        },
        {
            label: '首頁',
            icon: <CallToActionIcon />,
            value: 'index2'
        },
        {
            label: '首頁',
            icon: <CallToActionIcon />,
            value: 'index3'
        },
        {
            label: '首頁',
            icon: <CallToActionIcon />,
            value: 'index4'
        },
        {
            label: '首頁',
            icon: <CallToActionIcon />,
            value: 'index5'
        }
    ];
    const [activedItem, setActivedItem] = useState(menuList[0].value);

    return (
        <Footer
            {...args}
            activedItem={activedItem}
            menuList={menuList}
            setActivedItem={setActivedItem}
        />
    );
}
