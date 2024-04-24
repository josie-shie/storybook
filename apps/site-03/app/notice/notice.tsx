'use client';
import { useEffect, useState } from 'react';
import type { GetMailMemberListResponse } from 'data-center';
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
import type { InitMailData } from './noticeStore';
import MailInfo from './components/mailInfo';
import SkeletonLayout from './components/skeleton/skeleton';

type InitMailDataKeys = keyof InitMailData;

function ListContent({ activeTag }: { activeTag: InitMailDataKeys }) {
    const editStatus = useNoticeStore.use.editStatus();
    const initMailData = useNoticeStore.use.initMailData();
    const mailList = useNoticeStore.use.mailList();
    const setMailList = useNoticeStore.getState().setMailList;
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ totalCount: 0, pageCount: 0 });
    const [isNoData, setIsNoData] = useState<boolean | null>(null);

    const getMailList = async (currentPage: number, resetList = false) => {
        if (resetList) {
            const target = initMailData[activeTag];
            setMailList(target.list);
            setIsNoData(target.list.length === 0);
            setPagination(target.pagination);
            return;
        }
        const res = await getMailMemberList({
            eventTypeId: [1, 2, 3, 4, 5],
            tagName: activeTag === '全部' ? [] : [activeTag],
            pagination: {
                currentPage,
                perPage: 10
            }
        });
        if (!res.success) {
            console.error(res.error);
            return;
        }
        const updatedGuessMatchesList = mailList.concat(res.data.list);
        setMailList(updatedGuessMatchesList);
        setPagination(res.data.pagination);
    };

    const loadMoreList = async () => {
        if (page === pagination.pageCount) return;
        await getMailList(page + 1);
        setPage(page + 1);
    };

    useEffect(() => {
        setMailList([]);
        setPage(1);
        void getMailList(1, true);
    }, [activeTag]);

    if (isNoData) return <NoData text="暂无资料" />;
    return (
        <>
            <ul className={`${style.noticeList} ${editStatus ? style.isEdit : ''}`}>
                {mailList.map(mail => (
                    <MailCard key={mail.notifyId} mailData={mail} />
                ))}
            </ul>
            {mailList.length < pagination.totalCount ? (
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
    );
}

function MailList() {
    const setInitMailData = useNoticeStore.use.setInitMailData();
    const setMailList = useNoticeStore.getState().setMailList;

    const tagNames = ['全部', '系统通知', '交易明细', '最新活动'];
    const [activeTagName, setActiveTagName] = useState<InitMailDataKeys>(
        tagNames[0] as InitMailDataKeys
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleTagClick = (tagName: InitMailDataKeys) => {
        setActiveTagName(tagName);
    };

    useEffect(() => {
        const initFetch = async () => {
            setIsLoading(true);
            // 防止每次切tab都要重新loading 先把所有tab都撈回來
            const init = {
                全部: {} as GetMailMemberListResponse,
                系统通知: {} as GetMailMemberListResponse,
                交易明细: {} as GetMailMemberListResponse,
                最新活动: {} as GetMailMemberListResponse
            };
            await Promise.all(
                tagNames.map(async (value: string) => {
                    const res = await getMailMemberList({
                        eventTypeId: [1, 2, 3, 4, 5],
                        tagName: value === '全部' ? [] : [value],
                        pagination: {
                            currentPage: 1,
                            perPage: 10
                        }
                    });

                    if (!res.success) {
                        throw new Error();
                    }
                    init[value] = res.data;
                })
            );
            setInitMailData(init);
            setMailList(init['全部'].list);
            setIsLoading(false);
        };
        const refetchMailList = async (notify?: NotifyMessage) => {
            if (notify?.notifyType === 3) {
                await initFetch();
            }
        };
        void initFetch();
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
                                handleTagClick(tagName as InitMailDataKeys);
                            }}
                            type="button"
                        >
                            {tagName}
                        </ButtonBase>
                    ))}
                </div>
            ) : null}
            <div className={style.bettingPlan}>
                {isLoading ? <SkeletonLayout /> : <ListContent activeTag={activeTagName} />}
            </div>
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
