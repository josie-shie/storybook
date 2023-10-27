import React from 'react';
import { SwipeableDrawer } from '@mui/material';
import type { ReactNode } from 'react';
import type { OptionItemProps } from './optionItem';
import style from './selectDrawer.module.scss';

interface PropsType<T> {
    isOpen: boolean;
    children: ReactNode;
    value: T;
    onChange: (selectedValue: T) => void;
    onClose: () => void;
    onOpen: () => void;
}

function SelectDrawer<T>({ isOpen, children, value, onChange, onClose, onOpen }: PropsType<T>) {
    return (
        <SwipeableDrawer
            PaperProps={{
                style: {
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    background: '#2D2D2D'
                }
            }}
            anchor="bottom"
            onClose={onClose}
            onOpen={onOpen}
            open={isOpen}
        >
            <div className={style.selectDrawer}>
                <div className={style.dragBar} />
                <ul className={style.drawerContainer}>
                    {React.Children.map(children, child => {
                        if (React.isValidElement<OptionItemProps<T>>(child)) {
                            return React.cloneElement(child, {
                                isSelected: child.props.value === value,
                                onClick: (selectedValue: T) => {
                                    onChange(selectedValue);
                                    onClose();
                                }
                            });
                        }
                        return children;
                    })}
                </ul>
            </div>
        </SwipeableDrawer>
    );
}

export default SelectDrawer;
