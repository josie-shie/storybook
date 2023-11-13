import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import style from './buttonSwitch.module.scss';

interface Options {
    label: number | string;
    value: number | string;
}

interface SwitchProps {
    value: number | string | boolean;
    options: Options[];
    onChange: (value: number | string) => void;
    outline?: boolean;
}

const CustomTabs = styled(Tabs)<{ length: number }>(
    ({ length }) => `
    .MuiTabs-indicator {
        width: calc(100% / ${length}) !important;
    }
`
);

function BaseTabs({ value, options, onChange }: SwitchProps) {
    return (
        <CustomTabs
            className={style.baseTab}
            length={options.length}
            onChange={(e, changeValue) => {
                onChange(changeValue as number | string);
            }}
            value={value}
            variant="fullWidth"
        >
            {options.length > 0 &&
                options.map(option => (
                    <Tab
                        className={style.basetabBtn}
                        disableRipple
                        key={option.value}
                        label={option.label}
                        value={option.value}
                    />
                ))}
        </CustomTabs>
    );
}

export default BaseTabs;
