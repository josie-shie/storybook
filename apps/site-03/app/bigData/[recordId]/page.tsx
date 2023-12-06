import type { Metadata } from 'next';
import Handicap from './(dashboard)/handicap/handicap';

export const metadata: Metadata = {
    title: '分析结果'
};

function Page() {
    return <Handicap />;
}

export default Page;
