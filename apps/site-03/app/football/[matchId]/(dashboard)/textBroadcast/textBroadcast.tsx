import type { GetLiveText } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import style from './textBroadcast.module.scss';

function TextBroadcast({ broadcastList }: { broadcastList: GetLiveText[] }) {
    return (
        <>
            {broadcastList.length > 0 ? (
                <>
                    <h2 className={style.pageTitle}>文字直播</h2>
                    <ul className={style.textBroadcast}>
                        {broadcastList.map(broadcast => (
                            <li className={style.list} key={broadcast.id}>
                                <div className={style.top}>
                                    <p className={style.dateTime}>{broadcast.dateTime}</p>
                                    <p className={style.situation}>
                                        <span>{broadcast.homeName}</span>
                                        <span className={style.score}>{broadcast.score}</span>
                                        <span>{broadcast.awayName}</span>
                                    </p>
                                </div>
                                <div className={style.content}>
                                    <span className={style.time}>{broadcast.time}</span>
                                    {broadcast.content}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

export default TextBroadcast;
