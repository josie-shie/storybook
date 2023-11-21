'use client';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import backLeftArrowImg from '../../img/backLeftArrow.png';
import style from './layout.module.scss';

function CreatArticleLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    const createArticle = () => {
        router.push('/userInfo/myAnalysis/createArticle');
    };

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.back();
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div
                            className={style.text}
                            onClick={() => {
                                createArticle();
                            }}
                        >
                            发布文章
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </>
    );
}

export default CreatArticleLayout;
