import type { Metadata } from 'next';
import LoginAndResign from './loginAndResign';

export const metadata: Metadata = {
    title: '帐号相关 | FutureSport'
};

function Page() {
    return <LoginAndResign />;
}

export default Page;
