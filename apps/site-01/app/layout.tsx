import '@/styles/reset.scss';
import '@/styles/globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '智球网 - AI足球预测与全球即时比分 - 精准快速',
    description:
        '智球网结合先进的 AI 技术提供全球足球赛事的即时比分和精准预测。 无论是大联赛、杯赛或国际赛事，我们的 AI 预测让您领先一步，掌握比赛动态。 立即探索我们的即时比分和专业预测，不错过任何精彩瞬间！'
};

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="zh-Hans">
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}

export default RootLayout;
