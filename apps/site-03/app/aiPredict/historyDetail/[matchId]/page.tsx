import type { Metadata } from 'next';
import AiHistoryDetail from './aiHistoryDetail';

export const metadata: Metadata = {
    title: 'AI 赛事预测 | FutureSport'
};

function Page({ params }: { params: { matchId: number } }) {
    return (
        <div className="aiPredict">
            <AiHistoryDetail matchId={params.matchId} />
        </div>
    );
}

export default Page;
