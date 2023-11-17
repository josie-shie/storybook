import type { Metadata } from 'next';
import Account from './account';

export const metadata: Metadata = {
    title: '個人資料'
};

function Page() {
    return (
        <div className="account">
            <Account />
        </div>
    );
}

export default Page;
