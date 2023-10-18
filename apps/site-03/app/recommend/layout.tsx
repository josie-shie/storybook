import type { ReactNode } from 'react';

function RecommendLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div>Tab here</div>
            {children}
        </div>
    );
}

export default RecommendLayout;
