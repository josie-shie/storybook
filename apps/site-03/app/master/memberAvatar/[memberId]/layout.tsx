'use client';

import { Tab, Tabs } from 'ui';
import Header from '@/components/header/headerTitle';
import style from './layout.module.scss';
import Info from './info';
import MemberAvatar from './memberAvatar';

function MasterAvatarLayout({ params }: { params: { memberId: string } }) {
    const headerProps = {
        title: '会员个人'
    };
    const tabStyle = {
        gap: 0,
        swiperOpen: true,
        buttonRadius: 0
    };
    const tabList = [
        {
            label: '猜球',
            to: `/master/memberAvatar/${params.memberId}?status=guess`,
            status: 'guess'
        },
        {
            label: '关注',
            to: `/master/memberAvatar/${params.memberId}?status=focus`,
            status: 'focus'
        }
    ];

    return (
        <>
            <Header srcPath="/master/article" title={headerProps.title} />
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
                                <MemberAvatar params={params} />
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </>
    );
}

export default MasterAvatarLayout;
