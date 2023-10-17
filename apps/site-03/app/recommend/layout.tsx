import type { ReactNode } from 'react';
import Header from '../components/header/header';
import style from './recommend.module.scss';

function RecommendLayout({ children }: { children: ReactNode }) {
    return (
        <div className={style.layout}>
            <Header />
            <div>Tab here</div>
            {children}
        </div>
    );
}

export default RecommendLayout;
