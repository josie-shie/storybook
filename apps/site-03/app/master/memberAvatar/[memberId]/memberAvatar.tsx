import InfoTabs from './infoTabs';
import style from './memberAvatar.module.scss';

function MemberAvatar({ params }: { params: { memberId: string } }) {
    return (
        <div className={style.masterAvatar}>
            <InfoTabs params={params} />
        </div>
    );
}

export default MemberAvatar;
