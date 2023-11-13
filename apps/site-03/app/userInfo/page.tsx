import type { Metadata } from 'next';
import UserInfo from './userInfo';

export const metadata: Metadata = {
    title: '個人頁面 | User'
};

function Page() {
    return (
        <div className="userInfo">
            <UserInfo />
        </div>
    );
}

export default Page;
