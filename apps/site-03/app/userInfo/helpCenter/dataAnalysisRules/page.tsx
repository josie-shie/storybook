import type { Metadata } from 'next';
import DataAnalysisRules from './dataAnalysisRules';

export const metadata: Metadata = {
    title: '數據分析規則說明 | FutureSport'
};

function Page() {
    return <DataAnalysisRules />;
}

export default Page;
