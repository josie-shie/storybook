import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import SelectDrawer from './selectDrawer';
import OptionItem from './optionItem';
import style from './demo.module.scss';

const meta: Meta<typeof SelectDrawer> = {
    title: 'Example/SelectDrawer',
    component: SelectDrawer,
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof SelectDrawer>;

export const Normal: Story = {
    args: {},
    render: args => <DemoComponent {...args} />
};

const exampleData = [
    { label: 'option1', value: 1 },
    { label: 'option2', value: 2 },
    { label: 'option3', value: 3 },
    { label: 'option4', value: 4 }
];

function DemoComponent(args: ComponentProps<typeof SelectDrawer>) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState<number>(1);

    const onDrawerClose = () => {
        setIsOpen(false);
    };
    const onDrawerOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button
                className={style.demoButton}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                type="button"
            >
                {exampleData.find(obj => obj.value === value)?.label}
                <IconChevronDown />
            </button>
            <SelectDrawer
                {...args}
                isOpen={isOpen}
                onChange={val => {
                    setValue(val);
                }}
                onClose={onDrawerClose}
                onOpen={onDrawerOpen}
                value={value}
            >
                {exampleData.map(item => (
                    <OptionItem key={`opt-${item.value}`} value={item.value}>
                        {item.label}
                    </OptionItem>
                ))}
            </SelectDrawer>
        </>
    );
}
