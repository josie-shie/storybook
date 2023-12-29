import TabContent from '../../tabContent';

function Page({ params }: { params: { matchId: number } }) {
    return <TabContent initStatus="messageBoard" matchId={params.matchId} />;
}

export default Page;
