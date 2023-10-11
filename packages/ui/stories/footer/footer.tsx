import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import style from './footer.module.scss';

interface Menu {
    label: string;
    icon: ReactElement;
    value: string;
}

export interface FooterProps {
    /**
     * Footer Background, hex color code or color keywords are accepted
     */
    bgColor?: string;
    /**
     * The inactive item color
     */
    defaultColor?: string;
    /**
     * The actived item color
     */
    activeColor?: string;
    /**
     * The display menu list and each item should included label, icon and value(unique key)
     */
    menuList?: Menu[];
    /**
     * The actived item
     */
    activedItem: string;
    /**
     *  Set current actived item
     */
    setActivedItem: (value: string) => void;
}

function Footer({
    bgColor = '#111111',
    defaultColor = '#AAAAAA',
    activeColor = '#FFF',
    menuList = [],
    activedItem = menuList.length ? menuList[0].value : '',
    setActivedItem
}: FooterProps) {
    const changeActivedItem = (value: string) => {
        setActivedItem(value);
    };

    const gettIcon = (icon: ReactElement, value: string) => {
        return cloneElement(icon, {
            style: { color: activedItem === value ? activeColor : defaultColor }
        });
    };

    return (
        <div className={style.footerPlaceholder}>
            <footer className={style.footer}>
                {menuList.length ? (
                    <List className={style.menuList}>
                        {menuList.map(menu => {
                            return (
                                <ListItem
                                    className={`${style.listItem} ${
                                        activedItem === menu.value ? style.actived : ''
                                    }`}
                                    key={menu.value}
                                    onClick={() => {
                                        changeActivedItem(menu.value);
                                    }}
                                    sx={{ backgroundColor: bgColor }}
                                >
                                    {gettIcon(menu.icon, menu.value)}
                                    <div
                                        style={{
                                            color:
                                                activedItem === menu.value
                                                    ? activeColor
                                                    : defaultColor
                                        }}
                                    >{`${menu.label}`}</div>
                                </ListItem>
                            );
                        })}
                    </List>
                ) : null}
            </footer>
        </div>
    );
}

export { Footer };
