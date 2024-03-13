import type { Metadata } from 'next';
import UserServiceAgreement from './userServiceAgreement';

export const metadata: Metadata = {
    title: '用戶服務協議 | FutureSport'
};

function Page() {
    return <UserServiceAgreement />;
}

export default Page;
