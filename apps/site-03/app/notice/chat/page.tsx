import type { Metadata } from 'next';
import Chat from './chat';

export const metadata: Metadata = {
    title: '消息中心 - 聊天 | Sport'
};

function Page() {
    return <Chat />;
}

export default Page;
