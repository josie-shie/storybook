import type { Metadata } from 'next';
import UserInfo from './userInfo';

export const metadata: Metadata = {
    title: '个人中心 | FutureSport'
};

function Page() {
    return (
        <div className="userInfo">
            <UserInfo />
        </div>
    );
}

export default Page;
