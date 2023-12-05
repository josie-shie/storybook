import type { Metadata } from 'next';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

function Page() {
    return <MessageBoard />;
}

export default Page;
