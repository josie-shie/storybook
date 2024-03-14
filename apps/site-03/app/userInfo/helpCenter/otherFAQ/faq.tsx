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
                    <h2>平台内容相关</h2>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>网站页面无法正常浏览访问 。</div>
                    </div>
                    <span>刷新页面，或清除浏览器缓存或历史记录后重新访问网站页面。</span>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>网站项目内容无法显示或比分数据有误 。</div>
                    </div>
                    <span>联系官方客服进行反馈处理。</span>
                </div>
                <div className={style.zoon}>
                    <h2>猜球榜单相关</h2>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>胜率该如何计算。</div>
                    </div>
                    <span>胜率计算方法：胜率=胜出场次/（参与场次-走水场次）。</span>

                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>比赛的盘口会变化，最后统计以哪个为准。</div>
                    </div>
                    <span>统计以当前竞猜盘口为准。</span>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>上榜场次统计是按比赛时间还是参与时间计算的。</div>
                    </div>
                    <span>上榜场次统计按参与竞猜时间计算。</span>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>如何成为平台高手。</div>
                    </div>
                    <span>上榜于平台的周/月/季/连红榜前50名的用户即为平台高手。</span>
                </div>
                <div className={style.zoon}>
                    <h2>付费解锁相关</h2>
                    <div className={style.dotBox}>
                        <div className={style.dot} />
                        <div>如何解锁方案。</div>
                    </div>
                    <span>
                        点击付费查看按钮，确定支付平台币后即可解锁内容。若已支付但未解锁内容请联系客服处理。
                    </span>
                </div>
            </div>
        </>
    );
}

export default Faq;
