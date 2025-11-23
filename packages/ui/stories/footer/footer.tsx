import type { ReactElement } from 'react';
import { cloneElement, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
import style from './footer.module.scss';

interface Menu {
    label: string;
    icon?: ReactElement;
    includedRouters: string[];
    value: string;
    activedIcon?: ReactElement;
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
    // const router = useRouter();
    // const pathname = usePathname();
    const [activedItem, setActivedItem] = useState(activeRouter);
    const [isFirstActived, setIsFirstActived] = useState(true);

    const changeActivedItem = (value: string) => {
        if (isFirstActived) {
            setIsFirstActived(false);
        }

        setActivedItem(value);
    };

    const getIcon = (menu: Menu) => {
        if (!menu.icon) return;

        const isActive =
            activedItem === menu.value ||
            menu.includedRouters.some(str => activedItem.includes(str));

        if (menu.activedIcon && isActive) {
            return menu.activedIcon;
        }

        if (menu.activedIcon) {
            return menu.icon;
        }

        return cloneElement(menu.icon, {
            fill: isActive ? activeColor : defaultColor
        });
    };

    useEffect(() => {
        setActivedItem(activeRouter);
    }, [activeRouter]);

    // useEffect(() => {
    //     changeActivedItem(pathname);
    // }, []);

    return (
        <>
            {isShow ? (
                <div className={style.footerPlaceholder}>
                    <footer className={`ui-footer ${style.footer}`}>
                        {menuList.length ? (
                            <div className={style.menuList}>
                                {menuList.map(menu => {
                                    return (
                                        // waite for router
                                        // <Link
                                        //     className={`${style.listItem} ${
                                        //         activedItem === menu.value && !isFirstActived
                                        //             ? style.actived
                                        //             : ''
                                        //     }`}
                                        //     href={menu.value}
                                        //     key={menu.value}
                                        //     style={{ backgroundColor: bgColor }}
                                        // >
                                        //     {menu.icon ? (
                                        //         <div className={style.icon}>{getIcon(menu)}</div>
                                        //     ) : null}
                                        //     <div
                                        //         className={style.textLabel}
                                        //         style={{
                                        //             color:
                                        //                 activedItem === menu.value ||
                                        //                 menu.includedRouters.some(str =>
                                        //                     activedItem.includes(str)
                                        //                 )
                                        //                     ? activeColor
                                        //                     : defaultColor
                                        //         }}
                                        //     >{`${menu.label}`}</div>
                                        // </Link>
                                        <div
                                            className={`${style.listItem} ${
                                                activedItem === menu.value && !isFirstActived
                                                    ? style.actived
                                                    : ''
                                            }`}
                                            key={menu.value}
                                            onClick={() => {
                                                changeActivedItem(menu.value);
                                            }}
                                            style={{ backgroundColor: bgColor }}
                                        >
                                            {menu.icon ? (
                                                <div className={style.icon}>{getIcon(menu)}</div>
                                            ) : null}
                                            <div
                                                className={style.textLabel}
                                                style={{
                                                    color:
                                                        activedItem === menu.value ||
                                                        menu.includedRouters.some(str =>
                                                            activedItem.includes(str)
                                                        )
                                                            ? activeColor
                                                            : defaultColor
                                                }}
                                            >{`${menu.label}`}</div>
                                        </div>
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
