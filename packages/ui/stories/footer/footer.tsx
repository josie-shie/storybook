import type { ReactElement } from 'react';
import { cloneElement, useState } from 'react';
import Link from 'next/link';
import style from './footer.module.scss';

interface Menu {
    label: string;
    icon?: ReactElement;
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
     * Is show footer
     */
    isShow?: boolean;
    /**
     * Current actived Router
     */
    activeRouter?: string;
}

function Footer({
    bgColor = '#111111',
    defaultColor = '#AAAAAA',
    activeColor = '#FFF',
    menuList = [],
    isShow = true,
    activeRouter = menuList[0].value
}: FooterProps) {
    const [activedItem, setActivedItem] = useState(activeRouter);
    const [isFirstActived, setIsFirstActived] = useState(true);

    const changeActivedItem = (value: string) => {
        if (isFirstActived) {
            setIsFirstActived(false);
        }

        setActivedItem(value);
    };

    const gettIcon = (icon: ReactElement, value: string) => {
        return cloneElement(icon, {
            fill: activedItem === value ? activeColor : defaultColor
        });
    };

    return (
        <>
            {isShow ? (
                <div className={style.footerPlaceholder}>
                    <footer className={`ui-footer ${style.footer}`}>
                        {menuList.length ? (
                            <div className={style.menuList}>
                                {menuList.map(menu => {
                                    return (
                                        <Link
                                            className={`${style.listItem} ${
                                                activedItem === menu.value && !isFirstActived
                                                    ? style.actived
                                                    : ''
                                            }`}
                                            href={menu.value}
                                            key={menu.value}
                                            onClick={() => {
                                                changeActivedItem(menu.value);
                                            }}
                                            style={{ backgroundColor: bgColor }}
                                        >
                                            {menu.icon ? (
                                                <div className={style.icon}>
                                                    {gettIcon(menu.icon, menu.value)}
                                                </div>
                                            ) : null}
                                            <div
                                                className={style.textLabel}
                                                style={{
                                                    color:
                                                        activedItem === menu.value
                                                            ? activeColor
                                                            : defaultColor
                                                }}
                                            >{`${menu.label}`}</div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : null}
                    </footer>
                </div>
            ) : null}
        </>
    );
}

export { Footer };
