import type { Metadata } from 'next';
import UserInfo from './userInfo';

export const metadata: Metadata = {
    title: '個人中心'
};

function Page() {
    return (
        <div className="userInfo">
            <UserInfo />
        </div>
    );
}

export default Page;
