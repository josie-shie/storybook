'use client';
import { Drawer } from 'ui';
import { useState } from 'react';
import style from './home.module.scss';

function Home() {
    const [open, setOpen] = useState(true);
    return (
        <div className={style.home}>
            <Drawer
                isOpen={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <div>TEST Drawer</div>
            </Drawer>
        </div>
    );
}

export default Home;
