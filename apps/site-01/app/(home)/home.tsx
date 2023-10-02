'use client';
import { useUserStore, creatUserStore } from './userStore';

function Tool() {
    const token = useUserStore.use.token();
    const add = useUserStore.use.setToken();

    const handleAdd = () => {
        add('3339');
    };

    return <div onClick={handleAdd}>{token}</div>;
}

function Home() {
    creatUserStore({ token: 'oook' });

    return <Tool />;
}

export default Home;
