'use client';
import AiHistoryDetail from '@/app/aiPredict/historyDetail/[matchId]/aiHistoryDetail';
import { useLockBodyScroll } from '@/hooks/lockScroll';

function AiHistoryDetailLayout({ params }: { params: { matchId: number } }) {
    useLockBodyScroll();
    return <AiHistoryDetail matchId={params.matchId} />;
}

export default AiHistoryDetailLayout;
