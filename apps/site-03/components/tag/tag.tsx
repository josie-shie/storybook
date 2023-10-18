import type { ReactElement } from 'react';
import style from './tag.module.scss';

interface PropsType {
    icon?: ReactElement;
    text?: string;
    gradient?: 'blue';
    color?: string;
    background?: string;
}

function Tag({ icon, text, gradient, color, background }: PropsType) {
    const gradientClass = gradient === 'blue' ? style.gradientBlue : '';

    return (
        <div className={`${style.tag} ${gradientClass}`} style={{ background, color }}>
            {icon ? <span className={style.tagIcon}>{icon}</span> : null}
            <span>{text}</span>
        </div>
    );
}

export default Tag;
