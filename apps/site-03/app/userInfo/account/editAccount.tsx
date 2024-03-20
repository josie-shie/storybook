import { updateMemberInfo } from 'data-center';
import dayjs from 'dayjs';
import type { UpdateMemberInfoRequest } from 'data-center';
import Image from 'next/image';
import { timestampToString } from 'lib';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useAccountStore } from './accountStore';
import Date from './img/date.png';
import style from './account.module.scss';

interface FormFieldProps {
    disabled?: boolean;
    label: string;
    type: string;
    name: string;
    value: string | number;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    submitted: boolean;
}

function FormField({
    label,
    type,
    name,
    value,
    placeholder,
    onChange,
    disabled = false,
    submitted
}: FormFieldProps) {
    return submitted ? (
        <div className={style.item}>
            <span className={style.title}>{label} </span>
            <span className={style.content}>{value}</span>
        </div>
    ) : (
        <div className={style.item}>
            <label htmlFor={name}>{label} : </label>
            <input
                disabled={disabled}
                id={name}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value}
            />
        </div>
    );
}

function AditAccount({ setIsEdit }: { setIsEdit: (isEdit: boolean) => void }) {
    const imgUpload = useAccountStore.use.imgUpload();
    const userInfo = useUserStore.use.userInfo();
    const setUserInfo = useUserStore.use.setUserInfo();
    const submittedState = useAccountStore.use.submittedState();
    const formState = useAccountStore.use.formState();
    const setFormState = useAccountStore.use.setFormState();
    const setSubmittedState = useAccountStore.use.setSubmittedState();
    const setIsVisible = useNotificationStore.use.setIsVisible();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFormState = {
            ...formState,
            [name]: value
        };
        if (name === 'birthday') {
            newFormState.birthdayDisplay = value;
        }
        setFormState(newFormState);
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newFormState = {
            ...formState,
            [name]: value
        };
        setFormState(newFormState);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newSubmittedState = {
            username: formState.username !== '',
            birthday: formState.birthday !== 0,
            phoneNumber: formState.phoneNumber !== '',
            wechat: formState.wechat !== '',
            qq: formState.qq !== '',
            email: formState.email !== '',
            description: formState.description !== ''
        };
        setSubmittedState(newSubmittedState);

        const newInfo: UpdateMemberInfoRequest = {
            username: formState.username === userInfo.username ? '' : formState.username,
            avatarPath: imgUpload || userInfo.avatarPath,
            birthday: userInfo.birthday || dayjs(formState.birthday).valueOf() / 1000,
            wechat: formState.wechat,
            qqNumber: formState.qq,
            email: formState.email,
            description: formState.description
        };

        const res = await updateMemberInfo(newInfo);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '修改个人资讯失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            setSubmittedState(newSubmittedState);
            setUserInfo({ ...userInfo, ...newInfo });
            return;
        }

        setIsVisible('修改成功！', 'success');
        setIsEdit(false);
    };

    const goDisplay = () => {
        setFormState({
            username: userInfo.username,
            birthday: userInfo.birthday,
            birthdayDisplay:
                userInfo.birthday !== 0
                    ? timestampToString(userInfo.birthday, 'YYYY-MM-DD')
                    : '待新增',
            phoneNumber: userInfo.mobileNumber,
            wechat: userInfo.wechat,
            qq: userInfo.qqNumber,
            email: userInfo.email,
            description: userInfo.description
        });

        setIsEdit(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="昵称"
                name="username"
                onChange={handleInputChange}
                placeholder="添加昵称"
                submitted={false}
                type="text"
                value={formState.username || ''}
            />
            <div className={style.item}>
                <label htmlFor="description">简介：</label>
                <textarea
                    className={style.textarea}
                    id="description"
                    name="description"
                    onChange={handleTextareaChange}
                    placeholder="介绍一下自己吧"
                    value={formState.description}
                />
            </div>
            <span className={style.displayTitle}>生日{submittedState.birthday ? null : ' :'}</span>
            <div className={style.dateGroup}>
                <div
                    className={`${submittedState.birthday ? style.item : style.birthdayDisplay} ${
                        formState.birthday === 0 && style.placeHolderColor
                    }`}
                >
                    <span className={style.content}>{formState.birthdayDisplay}</span>
                </div>
                {!submittedState.birthday && (
                    <div className={style.calender}>
                        <input
                            className={style.dateInput}
                            id="birthday"
                            name="birthday"
                            onChange={handleInputChange}
                            style={{ opacity: 0 }}
                            type="date"
                            value={formState.birthday}
                        />
                        <Image alt="calender" height={24} src={Date} width={24} />
                    </div>
                )}
            </div>
            <FormField
                label="手机号"
                name="phoneNumber"
                onChange={handleInputChange}
                placeholder="添加手机号"
                submitted={submittedState.phoneNumber}
                type="text"
                value={formState.phoneNumber}
            />
            <FormField
                label="微信号"
                name="wechat"
                onChange={handleInputChange}
                placeholder="添加微信号"
                submitted={submittedState.wechat}
                type="text"
                value={formState.wechat}
            />
            <FormField
                label="QQ号"
                name="qq"
                onChange={handleInputChange}
                placeholder="添加QQ号"
                submitted={submittedState.qq}
                type="text"
                value={formState.qq}
            />
            <FormField
                label="邮箱"
                name="email"
                onChange={handleInputChange}
                placeholder="添加邮箱"
                submitted={submittedState.email}
                type="email"
                value={formState.email}
            />
            <p className={style.tip}>
                ＊「头像」、「昵称」、「简介」可重新编辑，其馀栏位提交后无法再次修改，请谨慎填写
            </p>
            <div className={style.buttonBox}>
                <button className={style.editBtn} onClick={goDisplay} type="button">
                    取消
                </button>
                <button
                    className={`${style.submit} ${
                        Object.values(formState).some(value => value) ? style.active : ''
                    }`}
                    type="submit"
                >
                    修改
                </button>
            </div>
        </form>
    );
}

export default AditAccount;
