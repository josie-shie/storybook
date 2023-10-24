import style from './textBroadcast.module.scss';
import type { LiveTextListType } from '@/types/detailStatus';

function TextBroadcast({ broadcastList }: { broadcastList: LiveTextListType[] }) {
    return (
        <>
            <h2 className={style.pageTitle}>文字直播</h2>
            {broadcastList.length > 0 ? (
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
            ) : (
                <p>No Data</p>
            )}
        </>
    );
}

export default TextBroadcast;
