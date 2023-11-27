import type { Metadata } from 'next';
import BigDataDetail from './bigDataDetail';

export const metadata: Metadata = {
    title: '分析結果'
};

function Page() {
    return <BigDataDetail />;
}

export default Page;
