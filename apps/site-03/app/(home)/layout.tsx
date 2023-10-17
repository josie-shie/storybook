import type { ReactNode } from 'react';

function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div>Tab here</div>
            <div>{children}</div>
        </>
    );
}

export default HomeLayout;
