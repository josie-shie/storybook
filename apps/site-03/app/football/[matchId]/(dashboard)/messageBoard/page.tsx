import MessageBoard from './messageBoard';

function Page({ params }: { params: { matchId: number } }) {
    return <MessageBoard matchId={params.matchId} />;
}

export default Page;
