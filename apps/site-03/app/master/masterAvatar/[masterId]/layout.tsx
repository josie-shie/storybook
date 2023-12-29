'use client';

import { useState } from 'react';
import { Tab, Tabs } from 'ui';
import Header from '@/components/header/headerTitle';
import style from './layout.module.scss';
import Info from './info';
import MasterAvatar from './masterAvatar';

function MasterAvatarLayout({ params }: { params: { masterId: string } }) {
    const [articleLength, setArticleLength] = useState(0);

    const headerProps = {
        title: '专家聊球'
    };
    const tabStyle = {
        gap: 0,
        swiperOpen: true,
        buttonRadius: 0
    };
    const tabList = [
        {
            label: `预测文章(${articleLength})`,
            to: `/master/masterAvatar/${params.masterId}?status=analysis`,
            status: 'analysis'
        },
        {
            label: '猜球',
            to: `/master/masterAvatar/${params.masterId}?status=guess`,
            status: 'guess'
        },
        {
            label: '关注',
            to: `/master/masterAvatar/${params.masterId}?status=focus`,
            status: 'focus'
        }
    ];

    return (
        <>
            <Header title={headerProps.title} />
            <Info params={params} />
            <div className={style.masterAvatar}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="center"
                    styling="underline"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.label} label={item.label} to={item.to}>
                                <MasterAvatar params={params} setArticleLength={setArticleLength} />
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </>
    );
}

export default MasterAvatarLayout;
