'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { type GetContestListResponse } from 'data-center';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { creatContestListStore } from '../../../contest/football/(list)/contestListStore';
import Stepper from '../components/stepper/stepper';
import BaseDatePicker from '../components/baseDatePicker/baseDatePicker';
import { creatArticleFilterStore, useArticleFilterStore } from './createArticleStore';
import NorthBangKokClubIcon from './img/northBangkokClubIcon.png';
import ThaiUniversityClubIcon from './img/thaiUniversityClubIcon.png';
import Check from './img/check.png';
import Push from './img/push.png';
import style from './createArticle.module.scss';

interface FilterListItem {
    id: number;
    gameName: string;
    gameTime: string;
    homeTeam: string;
    awayTeam: string;
    articleNumber: number;
}

function CreateArticle({ todayContest }: { todayContest: GetContestListResponse }) {
    const scheduleDate = Date.now();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const step = searchParams.get('step');
    const numberStep = Number(step);
    const [teamActive, setTeamActive] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedItem, setSelectedItem] = useState<FilterListItem | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    creatContestListStore(todayContest);
    creatArticleFilterStore({
        filterList: [
            {
                id: 113,
                gameName: '亞運男足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 1
            },
            {
                id: 114,
                gameName: '亞運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 2
            },
            {
                id: 221,
                gameName: '奧運男足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 24
            },
            {
                id: 222,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            },
            {
                id: 223,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            },
            {
                id: 224,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            },
            {
                id: 225,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            },
            {
                id: 226,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            },
            {
                id: 227,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            },
            {
                id: 228,
                gameName: '奧運女足',
                gameTime: '11:30',
                homeTeam: '泰国国立法政大学',
                awayTeam: '北曼谷学院',
                articleNumber: 17
            }
        ]
    });
    const filterList = useArticleFilterStore.use.filterList();

    const handleDate = (date: Date) => {
        const dateFormat = date.getTime();
        return dateFormat;
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const goDetail = (item: FilterListItem) => {
        setSelectedItem(item);
        router.push(`${pathname}?${createQueryString('step', '1')}`);
    };

    const goNext = () => {
        router.push(`${pathname}?${createQueryString('step', '2')}`);
    };

    const goEdit = () => {
        router.push(`${pathname}?${createQueryString('step', '1')}`);
    };

    return (
        <div className={style.createArticle}>
            <Stepper step={numberStep as 0 | 1 | 2} />
            {numberStep === 0 && (
                <div className={style.step1}>
                    <div className={style.date}>
                        <BaseDatePicker
                            defaultDate={new Date(Number(scheduleDate))}
                            direction="result"
                            onDateChange={date => {
                                handleDate(date);
                            }}
                        />
                    </div>
                    <div className={style.list}>
                        {filterList.map(item => {
                            return (
                                <div
                                    className={style.filterItem}
                                    key={item.id}
                                    onClick={() => {
                                        goDetail(item);
                                    }}
                                >
                                    <div className={style.left}>
                                        <div className={style.top}>
                                            <span className={style.name}>{item.gameName}</span>
                                            <span className={style.time}>{item.gameTime}</span>
                                        </div>
                                        <div className={style.game}>
                                            <span className={style.home}>{item.homeTeam}</span>
                                            <span className={style.compete}>VS</span>
                                            <span className={style.away}>{item.awayTeam}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {numberStep === 1 && (
                <div className={style.step2}>
                    <div className={style.vsBox}>
                        <div className={style.title}>
                            {selectedItem?.gameName} {selectedItem?.gameTime}
                        </div>
                        <div className={style.clubInfo}>
                            <div className={style.team}>
                                <Image alt="" height={48} src={ThaiUniversityClubIcon} width={48} />
                                <div className={style.name}>{selectedItem?.homeTeam}</div>
                            </div>
                            <div className={style.fight}>VS</div>
                            <div className={style.team}>
                                <Image alt="" height={48} src={NorthBangKokClubIcon} width={48} />
                                <div className={style.name}>{selectedItem?.awayTeam}</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.edit}>
                        <div className={style.title}>选择盘口</div>
                        <div className={style.playSection}>
                            <div className={style.area}>
                                <div className={style.title}>讓球 一球/球半</div>
                                <div className={style.button}>
                                    <div
                                        className={`${style.border} ${
                                            teamActive === 'home' ? style.active : ''
                                        }`}
                                        onClick={() => {
                                            setTeamActive('home');
                                        }}
                                    >
                                        <span>主</span>
                                        <span>0.86</span>
                                        {teamActive === 'home' && (
                                            <Image
                                                alt="check"
                                                className={style.check}
                                                height={20}
                                                src={Check}
                                                width={20}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={`${style.border} ${
                                            teamActive === 'away' ? style.active : ''
                                        }`}
                                        onClick={() => {
                                            setTeamActive('away');
                                        }}
                                    >
                                        <span>客</span>
                                        <span>0.96</span>
                                        {teamActive === 'away' && (
                                            <Image
                                                alt="check"
                                                className={style.check}
                                                height={20}
                                                src={Check}
                                                width={20}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={style.area}>
                                <div className={style.title}>大小 2.5</div>
                                <div className={style.button}>
                                    <div
                                        className={`${style.border} ${
                                            teamActive === 'big' ? style.active : ''
                                        }`}
                                        onClick={() => {
                                            setTeamActive('big');
                                        }}
                                    >
                                        <span>大</span>
                                        <span>0.86</span>
                                        {teamActive === 'big' && (
                                            <Image
                                                alt="check"
                                                className={style.check}
                                                height={20}
                                                src={Check}
                                                width={20}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={`${style.border} ${
                                            teamActive === 'small' ? style.active : ''
                                        }`}
                                        onClick={() => {
                                            setTeamActive('small');
                                        }}
                                    >
                                        <span>小</span>
                                        <span>0.96</span>
                                        {teamActive === 'small' && (
                                            <Image
                                                alt="check"
                                                className={style.check}
                                                height={20}
                                                src={Check}
                                                width={20}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.title}>文章内容</div>
                        <div className={style.writeSection}>
                            <input
                                onChange={handleTitleChange}
                                placeholder="新增标题"
                                type="text"
                                value={title}
                            />
                            <textarea
                                onChange={handleContentChange}
                                placeholder="内文 (前30字将提供用户预览)"
                                value={content}
                            />
                        </div>
                        <div className={style.send}>
                            <button
                                className={style.clear}
                                onClick={() => {
                                    setTeamActive('');
                                }}
                                type="button"
                            >
                                重选赛事
                            </button>
                            <button
                                className={`${style.next} ${
                                    teamActive.trim() && title.trim() && content.trim()
                                        ? style.active
                                        : ''
                                }`}
                                onClick={() => {
                                    goNext();
                                }}
                                type="button"
                            >
                                下一步
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {numberStep === 2 && (
                <div className={style.step3}>
                    <div className={style.reviewTitle}>预览文章</div>
                    <div className={style.review}>
                        <div className={style.time}>发表于今天 17:45</div>
                        <div className={style.title}>{title}</div>
                        <div className={style.article}>
                            <div className={style.leagueName}>
                                {selectedItem?.gameName} {selectedItem?.gameTime}
                            </div>
                            <div className={style.clubInfo}>
                                <div className={style.team}>
                                    <Image
                                        alt=""
                                        height={48}
                                        src={ThaiUniversityClubIcon}
                                        width={48}
                                    />
                                    <div className={style.name}>泰国国立法政大学</div>
                                </div>
                                <div className={style.fight}>VS</div>
                                <div className={style.team}>
                                    <Image
                                        alt=""
                                        height={48}
                                        src={NorthBangKokClubIcon}
                                        width={48}
                                    />
                                    <div className={style.name}>北曼谷學院</div>
                                </div>
                            </div>

                            <div className={style.content}>{content.substring(0, 30)}...</div>
                        </div>
                        <div className={style.paidArea}>
                            <div className={style.paidTitle}>须付费解锁内容:</div>
                            <div className={style.content}>{content.substring(30)}</div>

                            <div className={style.team}>
                                <div className={`${style.table} ${style.active}`}>
                                    <Image alt="" height={36} src={Push} width={36} />
                                    <div className={style.header}>{selectedItem?.homeTeam}</div>
                                    <div className={style.score}>
                                        <span>-0.5</span>
                                        <span>1.925</span>
                                    </div>
                                </div>
                                <div className={style.table}>
                                    <div className={style.header}>{selectedItem?.awayTeam}</div>
                                    <div className={style.score}>
                                        <span>+0.5</span>
                                        <span>1.775</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.send}>
                        <button
                            className={style.clear}
                            onClick={() => {
                                goEdit();
                            }}
                            type="button"
                        >
                            调整内文
                        </button>
                        <button
                            className={`${style.next} ${
                                teamActive.trim() && title.trim() && content.trim()
                                    ? style.active
                                    : ''
                            }`}
                            onClick={() => {
                                goNext();
                            }}
                            type="button"
                        >
                            确认发布
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateArticle;
