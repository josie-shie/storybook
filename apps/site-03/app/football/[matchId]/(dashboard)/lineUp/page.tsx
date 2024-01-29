import TabContent from '../../tabContent';

function Page({ params }: { params: { matchId: number } }) {
    return <TabContent initStatus="lineUp" matchId={params.matchId} />;
}

export default Page;
