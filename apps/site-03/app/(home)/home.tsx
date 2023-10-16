'use client';
import Button from '@mui/material/Button';
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
    creatUserStore({ token: 'Test' });

    return (
        <>
            <Tool />
            <Button variant="contained">Contained</Button>
        </>
    );
}

export default Home;
