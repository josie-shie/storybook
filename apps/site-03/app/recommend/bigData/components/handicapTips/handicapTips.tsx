import Image from 'next/image';
import style from './handicapTips.module.scss';
import iconHot from './img/hot.png';
import teamLogo from './img/homeTeam.png';
import Tag from '@/components/tag/tag';

interface PropsType {
    betType?: 'handicap' | 'total';
    betStatus?: 'win' | 'lose' | 'big' | 'small';
    gamesNumber: number;
    hot?: boolean;
}

const backgroundColorMap = { win: '#FF4F4F', lose: '#9B9B9B', big: '#4489FF', small: '#FF844F' };
const commentColorMap = { win: '#ED3A45', lose: '#8D8D8D', big: '#222222', small: '#222222' };
const textMap = { win: '紅', lose: '輸', big: '大', small: '小' };

function HandicapTips({ betType = 'total', betStatus = 'small', gamesNumber, hot }: PropsType) {
    const playWay = betType === 'total' ? '大小' : '讓球';
    const tagLabel = textMap[betStatus];
    const tagBgColor = backgroundColorMap[betStatus];
    const commentColor = commentColorMap[betStatus];

    return (
        <div className={style.handicapTips}>
            {hot ? (
                <span className={style.flag}>
                    <Image alt="" className={style.image} src={iconHot} />熱
                </span>
            ) : null}
            <div className={style.tagContainer}>
                <Tag background="#F3F3F3" color="#4489FF" text={`全場${playWay}`} />
                <Tag background={tagBgColor} text={`${gamesNumber}連${tagLabel}`} />
            </div>
            <div className={style.matchup}>
                <span>欧锦U20A</span>
                <span> | 09-05 16:45</span>
                <span> | 大連人 vs 山東泰山</span>
            </div>
            <div className={style.result}>
                <div className={style.comment} style={{ color: commentColor }}>
                    <Image alt="teamLogo" className={style.team} src={teamLogo} width={28} />
                    大連人連輸3場
                </div>
                <button className={style.button} type="button">
                    詳情
                </button>
            </div>
        </div>
    );
}

export default HandicapTips;
