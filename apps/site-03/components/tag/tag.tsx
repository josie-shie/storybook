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

    if (!icon && !text) return null;
    return (
        <div className={`baseTag ${style.tag} ${gradientClass}`} style={{ background, color }}>
            {icon ? icon : null}
            <span>{text}</span>
        </div>
    );
}

export default Tag;
