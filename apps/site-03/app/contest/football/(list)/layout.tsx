import type { ReactNode } from 'react';

function ContestListLayout({ children }: { children: ReactNode }) {
    return (
        <div className="contestListLayout">
            <div>Header</div>
            <div>{children}</div>
        </div>
    );
}

export default ContestListLayout;
