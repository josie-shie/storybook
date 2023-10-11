import type { Meta, StoryObj } from '@storybook/react';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import type { FooterProps } from './footer';
import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
    title: 'site-01/Footer',
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
            value: '/'
        },
        {
            label: '首頁',
            icon: <CallToActionIcon />,
            value: '/index1'
        },
        {
            label: '首頁',
            icon: <CallToActionIcon />,
            value: '/index2'
        }
    ];

    return <Footer {...args} menuList={menuList} />;
}
