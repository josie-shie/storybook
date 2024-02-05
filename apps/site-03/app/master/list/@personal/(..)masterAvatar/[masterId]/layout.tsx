'use client';

import Header from '@/components/header/headerTransparent';
import Info from '@/app/master/masterAvatar/[masterId]/info';
import style from '@/app/master/list/layout.module.scss';
import MasterAvatar from '@/app/master/masterAvatar/[masterId]/masterAvatar';
import { useLockBodyScroll } from '@/hooks/lockScroll';

function Layout({ params }: { params: { masterId: string } }) {
    useLockBodyScroll();

    return (
        <div className={style.articleLayout}>
            <Header title="专家聊球" />
            <Info params={params} />
            <MasterAvatar params={params} />
        </div>
    );
}

export default Layout;
