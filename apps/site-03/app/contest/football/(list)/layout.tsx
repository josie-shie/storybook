import type { ReactNode } from 'react';
import Image from 'next/image';
import style from './layout.module.scss';
import FilterIcon from './img/filter.png';
import SettingIcon from './img/setting.png';
import Logo from './img/logo.png';
import { Tabs } from '@/components/tabs/tabs';
import HeaderFilter from '@/components/header/headerFilter';
import Footer from '@/components/footer/footer';

function ContestListLayout({ children }: { children: ReactNode }) {
    return (
        <div className="contestListLayout">
            <HeaderFilter logo={<Image alt="logo" height={16} src={Logo} />}>
                <div className={style.tool}>
                    <Image alt="filter" className={style.mr} sizes="32" src={FilterIcon} />
                    <Image alt="setting" sizes="32" src={SettingIcon} />
                </div>
            </HeaderFilter>
            <div className={style.main}>
                <div className={style.tab}>
                    <Tabs
                        labels={['全部', '已開賽', '未開賽', '賽程', '賽果']}
                        paths={[
                            '/contest/football',
                            '/contest/football?status=progress',
                            '/contest/football?status=notyet',
                            '/contest/football?status=scheule',
                            '/contest/football?status=result'
                        ]}
                        styling="button"
                    />
                </div>
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default ContestListLayout;
