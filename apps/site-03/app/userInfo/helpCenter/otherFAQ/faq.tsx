'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import style from '../helpCenter.module.scss';

function Faq() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo/helpCenter');
    };

    return (
        <>
            <Header back={back} title="其他 FAQ" />
            <div className={style.detail}>
                <div className={style.zoon}>
                    <h2>平台內容相關</h2>
                    <div className={style.dot}>网站页面无法正常浏览访问 。</div>
                    <span>刷新页面，或清除浏览器缓存或历史记录后重新访问网站页面。</span>
                    <div className={style.dot}>网站项目内容无法显示或比分数据有误 。</div>
                    <span>联系官方客服进行反馈处理。</span>
                </div>
                <div className={style.zoon}>
                    <h2>猜球榜單相關</h2>
                    <div className={style.dot}>胜率該如何计算。</div>
                    <span>胜率计算方法：胜率=胜出场次/（参与场次-走水场次）。</span>

                    <div className={style.dot}>比赛的盘口会变化，最后统计以哪个为准。</div>
                    <span>统计以当前竞猜盘口为准。</span>
                    <div className={style.dot}>上榜场次統計是按比赛时间还是参与时间计算的。</div>
                    <span>上榜场次统计按参与竞猜时间计算。</span>
                    <div className={style.dot}>如何成為平台高手。</div>
                    <span>上榜於平台的周/月/季/連紅榜前50名的用戶即為平台高手。</span>
                </div>
                <div className={style.zoon}>
                    <h2>付費解鎖相關</h2>
                    <div className={style.dot}>如何解鎖方案。</div>
                    <span>
                        點擊付費查看按鈕，確定支付平台幣後即可解鎖內容。若已支付但未解鎖內容請聯繫客服處理。
                    </span>
                </div>
            </div>
        </>
    );
}

export default Faq;
