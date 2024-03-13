import type { Metadata } from 'next';
import UserServiceAgreement from './userServiceAgreement';

export const metadata: Metadata = {
    title: '用户服务协议 | FutureSport'
};

function Page() {
    return <UserServiceAgreement />;
}

export default Page;
