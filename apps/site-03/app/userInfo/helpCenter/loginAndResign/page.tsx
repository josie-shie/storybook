import type { Metadata } from 'next';
import LoginAndResign from './loginAndResign';

export const metadata: Metadata = {
    title: '帳號相關 | FutureSport'
};

function Page() {
    return <LoginAndResign />;
}

export default Page;
