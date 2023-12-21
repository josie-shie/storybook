'use client';

import type { ReactNode } from 'react';
import type { RecommendPost } from 'data-center';
import { creatArticleStore } from './articleStore';

function Layout({ children }: { children: ReactNode }) {
    creatArticleStore({ articleList: [] as RecommendPost[] });

    return <>{children}</>;
}

export default Layout;
