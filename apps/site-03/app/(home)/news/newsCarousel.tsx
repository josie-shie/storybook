import 'swiper/css';
import 'swiper/css/effect-creative';
// import { Keyboard, Pagination, Navigation, EffectCreative } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Link from 'next/link';
import style from './news.module.scss';
// import { useNewsStore } from './newsStore';

// interface Slide {
//     id: number;
//     image: string;
//     leagueChs: string;
//     title: string;
// }

// function NewsSlide({ slideInfo }: { slideInfo: Slide }) {
//     return (
//         <Link href={`/news/${slideInfo.id}`}>
//             <div
//                 className={style.slideImage}
//                 style={{ backgroundImage: `url(${slideInfo.image})` }}
//             >
//                 <div className={style.contestInfo}>
//                     <div className={style.newsInfo}>
//                         <div className={style.contestName}>{slideInfo.leagueChs}</div>
//                         <div className={style.newsTitle}>{slideInfo.title}</div>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// 經PM確認目前先不顯示快訊的輪播功能
function NewsCarousel() {
    // const slideList = useNewsStore.use.slideList();

    return (
        <div className={style.carousel}>
            <div className={style.title}>热门快讯</div>
            {/* <div style={{ height: '180px', width: '100%' }}>
                <Swiper
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400]
                        },
                        next: {
                            translate: ['100%', 0, 0]
                        }
                    }}
                    effect="creative"
                    grabCursor
                    keyboard={{
                        enabled: true
                    }}
                    modules={[EffectCreative, Keyboard, Pagination, Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }}
                    pagination={{
                        clickable: true
                    }}
                >
                    {slideList.map(slide => {
                        return (
                            <SwiperSlide key={slide.id}>
                                <NewsSlide slideInfo={slide} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div> */}
        </div>
    );
}

export default NewsCarousel;
