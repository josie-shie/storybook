import type { Metadata } from 'next';
import Account from './account';

export const metadata: Metadata = {
    title: '个人资料 | FutureSport'
};

function Page() {
    return (
        <div className="account">
            <Account />
        </div>
    );
}

export default Page;
