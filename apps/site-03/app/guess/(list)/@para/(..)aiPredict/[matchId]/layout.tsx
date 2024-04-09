'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLockBodyScroll } from '@/hooks/lockScroll';
import AiPredictDetail from '@/app/aiPredict/[matchId]/aiPredictDetail';
import backLeftArrowImg from './img/backLeftArrow.png';
import style from './layout.module.scss';

function AiDetailLayout({ params }: { params: { matchId: string } }) {
    useLockBodyScroll();
    const router = useRouter();

    const back = () => {
        router.back();
    };

    return (
        <div className="aiPredictDetailPageLayout">
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={back}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>AI預測</div>
                    </div>
                </div>
            </div>
            <AiPredictDetail params={params} />
        </div>
    );
}

export default AiDetailLayout;
