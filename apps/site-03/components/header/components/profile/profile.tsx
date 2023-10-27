import Image from 'next/image';
import profileIcon from '../../img/profileIcon.png';
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
            <Image alt="" className={style.icon} height={24} src={profileIcon} width={24} />
            <div className={style.totalNumber}>{formatNumberWithCommas(total)}</div>
        </div>
    );
}

export default Profile;
