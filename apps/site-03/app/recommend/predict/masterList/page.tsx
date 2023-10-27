import type { Metadata } from 'next';
import MasterList from './masterList';

export const metadata: Metadata = {
    title: '专家分析观点'
};

function Page() {
    return <MasterList />;
}

export default Page;
