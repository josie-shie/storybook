'use client';
import { useEffect, useState } from 'react';
import type { GetMailMemberResponse } from 'data-center';
import { getMailMemberList } from 'data-center';
import { mqttService } from 'lib';
import type { NotifyMessage } from 'lib';
import ButtonBase from '@mui/material/ButtonBase';
import { CircularProgress } from '@mui/material';
import { InfiniteScroll } from 'ui';
import NoData from '@/components/baseNoData/noData';
import MailCard from './components/mailCard';
import style from './notice.module.scss';
import { useNoticeStore } from './noticeStore';
import MailInfo from './components/mailInfo';
import SkeletonLayout from './components/skeleton/skeleton';

function MailList() {
    const editStatus = useNoticeStore.use.editStatus();
    const mailList = useNoticeStore.use.mailList();
    const setMailList = useNoticeStore.getState().setMailList;
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ totalCount: 0, pageCount: 0 });
    const [filteredMailList, setFilteredMailList] = useState(mailList);

    const tagNames = Array.from(
        new Set(mailList.filter(mail => mail.tag.tagName).map(mail => mail.tag.tagName))
    );
    tagNames.unshift('全部');
    const [activeTagName, setActiveTagName] = useState(tagNames[0]);
    const getMailList = async (currentPage: number) => {
        const res = await getMailMemberList({
            eventTypeId: [1, 2, 3, 4, 5],
            pagination: {
                currentPage,
                perPage: 10
            }
        });
        if (!res.success) {
            console.error(res.error);
            return;
        }
        // debugger;
        setPagination(res.data.pagination);
        setIsNoData(res.data.list.length === 0);
        if (mailList.length) {
            setMailList(mailList.concat(res.data.list));
        } else {
            setMailList(res.data.list);
        }
        doFilterList(activeTagName, res.data.list);
    };

    const doFilterList = (tagName: string, list: GetMailMemberResponse[]) => {
        if (activeTagName === '全部') {
            setFilteredMailList(list);
        } else {
            const aa = list.filter(mail => mail.tag.tagName === tagName);
            setFilteredMailList(aa);
        }
    };

    const handleTagClick = (tagName: string) => {
        setActiveTagName(tagName);
        doFilterList(tagName, mailList);
    };

    const loadMoreList = async () => {
        if (page === pagination.pageCount) return;
        await getMailList(page + 1);
        setPage(page + 1);
    };

    useEffect(() => {
        const refetchMailList = async (notify?: NotifyMessage) => {
            if (notify?.notifyType === 3) {
                await getMailList(1);
            }
        };

        void getMailList(1);
        mqttService.getNotifyMessage(refetchMailList);
    }, []);

    return (
        <>
            {tagNames.length ? (
                <div className={style.typeList}>
                    {tagNames.map(tagName => (
                        <ButtonBase
                            className={`${style.tag} ${
                                tagName === activeTagName ? style.active : ''
                            }`}
                            key={tagName}
                            onClick={() => {
                                handleTagClick(tagName);
                            }}
                            type="button"
                        >
                            {tagName}
                        </ButtonBase>
                    ))}
                </div>
            ) : null}

            {isNoData === null && <SkeletonLayout />}
            {filteredMailList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
            ) : (
                <ul className={`${style.noticeList} ${editStatus ? style.isEdit : ''}`}>
                    {filteredMailList.map(mail => (
                        <MailCard key={mail.notifyId} mailData={mail} />
                    ))}
                </ul>
            )}
            {filteredMailList.length > 0 ? (
                <>
                    <ul className={`${style.noticeList} ${editStatus ? style.isEdit : ''}`}>
                        {filteredMailList.map(mail => (
                            <MailCard key={mail.notifyId} mailData={mail} />
                        ))}
                    </ul>
                    {filteredMailList.length < pagination.totalCount ? (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <div className={style.listEnd}>
                            <p>已滑到底啰</p>
                        </div>
                    )}
                </>
            ) : (
                <NoData text="暂无资料" />
            )}
        </>
    );
}

function Notice() {
    return (
        <>
            <MailList />
            <MailInfo />
            <div className={style.homeIndicatorPlaceHolder} />
        </>
    );
}

export default Notice;
