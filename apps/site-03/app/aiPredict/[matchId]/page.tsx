import AiPredictDetail from './aiPredictDetail';

function Page({ params }: { params: { matchId: string } }) {
    return (
        <div className="aiPredict">
            <AiPredictDetail params={params} />
        </div>
    );
}

export default Page;
