import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { SwitchProps } from './switch';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
    title: 'Example/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Normal: Story = {
    args: {},
    render: args => <NormalComponent {...args} />
};

function NormalComponent(args: SwitchProps) {
    const [currentSwitch, setCurrentSwitch] = useState('option1');

    return (
        <Switch
            {...args}
            onChange={setCurrentSwitch}
            options={[
                { label: '選項1', value: 'option1' },
                { label: '選項2', value: 'option2' },
                { label: '選項3', value: 'option3' }
            ]}
            value={currentSwitch}
        />
    );
}
