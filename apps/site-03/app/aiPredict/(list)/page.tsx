import type { Metadata } from 'next';
import AiPredict from './aiPredict';

export const metadata: Metadata = {
    title: 'AI 赛事预测 | FutureSport'
};
function Page() {
    return <AiPredict />;
}

export default Page;
