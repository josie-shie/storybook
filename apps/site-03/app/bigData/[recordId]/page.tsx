import type { Metadata } from 'next';
import AnalysisResult from './analysisResult';

export const metadata: Metadata = {
    title: '分析结果'
};

function Page() {
    return <AnalysisResult />;
}

export default Page;
