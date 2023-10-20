import Image from 'next/image';
import style from './avatar.module.scss';
import defaultImgSrc from './img/mayci.png';

interface PropsType {
    src?: string;
    size?: number;
    borderColor?: string;
}

function Avatar({ src, size, borderColor }: PropsType) {
    return (
        <div className={style.avatarContainer} style={{ width: `${size}px`, height: `${size}px` }}>
            <Image
                alt="avatar"
                className={style.avatar}
                height={0}
                sizes="100vw"
                src={src || defaultImgSrc.src}
                style={{ borderColor }}
                width={0}
            />
        </div>
    );
}

export default Avatar;
