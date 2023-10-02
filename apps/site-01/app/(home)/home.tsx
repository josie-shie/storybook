'use client';
import { useUserStore, creatUserStore } from './userStore';

function Tool() {
    const token = useUserStore.use.token();
    const add = useUserStore.use.setToken();

    return <div onClick={() => add('3339')}>{token}</div>;
}

function Home() {
    creatUserStore({ token: 'oook' });

    return <Tool />;
}

export default Home;
