'use client';

import Header from '@/components/header/headerTransparent';
import Info from '@/app/master/masterAvatar/[masterId]/info';
import MasterAvatar from '@/app/master/masterAvatar/[masterId]/masterAvatar';
import style from '@/app/master/masterAvatar/[masterId]/layout.module.scss';
import { useLockBodyScroll } from '@/hooks/lockScroll';

function Layout({ params }: { params: { masterId: string } }) {
    useLockBodyScroll();

    return (
        <div className={style.layout}>
            <Header title="专家聊球" />
            <div className={style.masterAvatarLayout}>
                <Info params={params} />
                <MasterAvatar params={params} />
            </div>
        </div>
    );
}

export default Layout;
