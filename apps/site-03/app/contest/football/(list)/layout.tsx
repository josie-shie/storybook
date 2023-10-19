import type { ReactNode } from 'react';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';

function ContestListLayout({ children }: { children: ReactNode }) {
    return (
        <div className="contestListLayout">
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
    );
}

export default ContestListLayout;
