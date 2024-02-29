'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './error.module.scss';
import ErrorImage from './img/error.jpg';

export default function Error({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={style.error}>
            <Header />
            <div className={style.box}>
                <div className={style.content}>
                    <Image alt="error" height={100} src={ErrorImage} width={100} />
                    <p className={style.text}>哎呀，系统暂时出错！请稍候重试</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
