'use client';

import type { ReactNode } from 'react';
import { creatArticleStore } from './articleStore';

function Layout({ children }: { children: ReactNode }) {
    creatArticleStore({ articleList: [] });

    return <>{children}</>;
}

export default Layout;
