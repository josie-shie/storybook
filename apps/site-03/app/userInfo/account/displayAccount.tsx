import style from './account.module.scss';
import { useAccountStore } from './accountStore';

function DisplayAccount({ setIsEdit }: { setIsEdit: (isEdit: boolean) => void }) {
    const formState = useAccountStore.use.formState();
    const submittedState = useAccountStore.use.submittedState();

    const formatDisplay = (value: string, display?: string) => {
        const show = display ? display : '待新增';
        return value ? (
            <span className={style.content}>{value}</span>
        ) : (
            <span className={`${style.content} ${style.noValue}`}>{show}</span>
        );
    };
    const goEdit = () => {
        setIsEdit(true);
    };
    return (
        <>
            <div className={style.item}>
                <span className={style.title}>昵称 </span>
                {formatDisplay(formState.username)}
            </div>
            <div className={style.item}>
                <span className={style.title}>简介 </span>
                {formatDisplay(formState.description)}
            </div>
            <span className={style.displayTitle}>生日{submittedState.birthday ? null : ' :'}</span>
            <div className={style.dateGroup}>
                <div className={style.item}>
                    <span
                        className={`${style.content} ${formState.birthday === 0 && style.noValue}`}
                    >
                        {formState.birthday === 0 ? '待新增' : formState.birthdayDisplay}
                    </span>
                </div>
            </div>
            <div className={style.item}>
                <span className={style.title}>手机号 </span>
                {formatDisplay(formState.phoneNumber)}
            </div>
            <div className={style.item}>
                <span className={style.title}>微信号 </span>
                {formatDisplay(formState.wechat)}
            </div>
            <div className={style.item}>
                <span className={style.title}>QQ号 </span>
                {formatDisplay(formState.qq)}
            </div>
            <div className={style.item}>
                <span className={style.title}>邮箱 </span>
                {formatDisplay(formState.email)}
            </div>
            <p className={style.tip}>
                ＊「头像」、「昵称」、「简介」可重新编辑，其馀栏位提交后无法再次修改，请谨慎填写
            </p>
            <button className={style.editBtn} onClick={goEdit} type="button">
                編輯資料
            </button>
        </>
    );
}

export default DisplayAccount;
