import type { StoryObj, Meta } from '@storybook/react';
import { BaseCropper } from './baseCropper';

const meta: Meta<typeof BaseCropper> = {
    title: 'Example/BaseCropper',
    component: BaseCropper,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        circleCropper: { control: 'boolean' },
        containerWidth: { control: 'string' },
        showCropper: { control: 'boolean' },
        imgSrc: { control: 'text' },
        setImgFile: { action: 'setImgFile' }
    }
};

export default meta;
type Story = StoryObj<typeof BaseCropper>;

export const ShowCropper: Story = {
    render: args => (
        <div style={{ width: '500px' }}>
            <BaseCropper {...args} />
        </div>
    )
};
