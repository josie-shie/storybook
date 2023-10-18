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
            <img
                alt="avatar"
                className={style.avatar}
                src={src || defaultImgSrc.src}
                style={{ borderColor }}
            />
        </div>
    );
}

export default Avatar;
