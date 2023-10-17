import style from './tag.module.scss';

interface PropsType {
    text?: string;
}

function Tag({ text }: PropsType) {
    return <span className={style.tag}>{text}</span>;
}

export default Tag;
