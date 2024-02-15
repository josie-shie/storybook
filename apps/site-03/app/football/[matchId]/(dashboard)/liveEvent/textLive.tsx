'use client';
import type { GetLiveTextResponse } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import TeamLogo from '@/components/teamLogo/teamLogo';
import { useContestDetailStore } from '../../contestDetailStore';
import style from './textLive.module.scss';
import { eventStatusMap } from './eventStatusMap';
import NoticeIcon from './img/notice.svg';

function TextLive({ liveList }: { liveList: GetLiveTextResponse }) {
    const matchDetail = useContestDetailStore.use.matchDetail();

    const isType = (type?: number) => {
        if (type && typeof eventStatusMap()[type] !== 'string') {
            return true;
        }
        return false;
    };

    return (
        <>
            {liveList.length > 0 ? (
                <ul className={style.textLive}>
                    {liveList.map((live, idx) => (
                        <li
                            className={`${style.list} ${!isType(live.type) && style.notice}`}
                            key={`textLive_${idx.toString()}`}
                        >
                            <div className={style.iconLine}>
                                <div className={style.icon}>
                                    {live.type && isType(live.type) ? (
                                        eventStatusMap()[live.type]
                                    ) : (
                                        <NoticeIcon className={style.noticeIcon} />
                                    )}
                                </div>
                            </div>
                            <div className={style.liveContent}>
                                <div className={style.text}>{live.data}</div>
                            </div>
                            {live.position !== 0 && (
                                <div className={style.team}>
                                    <TeamLogo
                                        alt=""
                                        height={24}
                                        src={
                                            live.position === 1
                                                ? matchDetail.homeLogo
                                                : matchDetail.awayLogo
                                        }
                                        width={24}
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

export default TextLive;
