import ProfileIcon from '../../img/profileIcon.svg';
import style from './profile.module.scss';

interface ProfileProps {
    total: number;
}

function formatNumberWithCommas(total: number): string {
    return total.toString().replace(/\B(?=(?<temp1>\d{3})+(?!\d))/g, ',');
}

function Profile({ total }: ProfileProps) {
    return (
        <div className={style.profile}>
            <ProfileIcon className={style.icon} />
            <div className={style.totalNumber}>{formatNumberWithCommas(total)}</div>
        </div>
    );
}

export default Profile;
