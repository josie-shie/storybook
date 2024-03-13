import type { Metadata } from 'next';
import DataAnalysisRules from './dataAnalysisRules';

export const metadata: Metadata = {
    title: '数据分析规则说明 | FutureSport'
};

function Page() {
    return <DataAnalysisRules />;
}

export default Page;
