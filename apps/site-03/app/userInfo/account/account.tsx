'use client';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { UpdateMemberInfoRequest } from 'data-center';
import { timestampToString, uploadImage } from 'lib';
import { updateMemberInfo } from 'data-center';
import dayjs from 'dayjs';
import Header from '@/components/header/headerTitleDetail';
import { useNotificationStore } from '@/app/notificationStore';
import AvatarCropperDrawer from '@/components/avatarCropperDrawer/avatarCropperDrawer';
import { useUserStore } from '../../userStore';
import style from './account.module.scss';
import Avatar from './img/avatar.png';
import Date from './img/date.png';
import { useAccountStore } from './accountStore';

interface UploadResponse {
    filePath: string;
}

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
    submitted,
    disabled = false
}: FormFieldProps) {
    let displayValue = value;
    if (name === 'birthday' && typeof value === 'number') {
        displayValue = timestampToString(value, 'YYYY-MM-DD');
    }
    return submitted ? (
        <div className={style.item}>
            <span className={style.title}>{label} </span>
            <span className={style.content}>{displayValue}</span>
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

function Account() {
    const headerProps = {
        title: '个人资料'
    };
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();
    const setUserInfo = useUserStore.use.setUserInfo();
    const formState = useAccountStore.use.formState();
    const submittedState = useAccountStore.use.submittedState();
    const imgSrc = useAccountStore.use.imgSrc();
    const imgUpload = useAccountStore.use.imgUpload();
    const isSubmitted = useAccountStore.use.isSubmitted();
    const setFormState = useAccountStore.use.setFormState();
    const setSubmittedState = useAccountStore.use.setSubmittedState();
    const setImgSrc = useAccountStore.use.setImgSrc();
    const setImgUpload = useAccountStore.use.setImgUpload();
    const setIsSubmitted = useAccountStore.use.setIsSubmitted();
    const setIsVisible = useNotificationStore.use.setIsVisible();

    const [isAvatarCropperOpen, setIsAvatarCropperOpen] = useState(false);
    const [newAvatar, setNewAvatar] = useState<string>();

    const back = () => {
        router.push('/userInfo');
    };

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setNewAvatar(e.target?.result as string);
                setIsAvatarCropperOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImg = (arg: Blob) => {
        setIsAvatarCropperOpen(false);
        void uploadImgWithBlob(arg);
    };

    const uploadImgWithBlob = async (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = e => {
            setImgSrc(e.target?.result as string);
        };
        reader.readAsDataURL(blob);

        try {
            const data: UploadResponse = await uploadImage(blob);
            if (data.filePath) {
                setImgUpload(data.filePath);
            } else {
                setIsVisible('上传失败', 'error');
            }
        } catch (error) {
            console.error('上传图片过程中发生错误', error);
        }
    };

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
        const allFieldsFilled = Object.values(formState).every(
            value => String(value).trim() !== ''
        );
        if (allFieldsFilled) {
            setIsSubmitted(true);
        }

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

        const obj: UpdateMemberInfoRequest = {
            username: formState.username === userInfo.username ? '' : formState.username,
            avatarPath: imgUpload || userInfo.avatarPath,
            birthday: userInfo.birthday || dayjs(formState.birthday).valueOf() / 1000,
            wechat: formState.wechat,
            qqNumber: formState.qq,
            email: formState.email,
            description: formState.description
        };

        const res = await updateMemberInfo(obj);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '修改个人资讯失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
            setSubmittedState(newSubmittedState);
            setUserInfo({ ...userInfo, username: formState.username });
            setIsSubmitted(false);
            return;
        }

        setIsVisible('修改成功！', 'success');
    };

    const editIntro = () => {
        const newSubmittedState = {
            ...submittedState,
            description: false
        };
        setSubmittedState(newSubmittedState);
        setIsSubmitted(false);
    };

    const editUserName = () => {
        const newSubmittedState = {
            ...submittedState,
            username: false
        };
        setSubmittedState(newSubmittedState);
        setIsSubmitted(false);
    };

    useEffect(() => {
        if (userInfo.avatarPath && userInfo.avatarPath !== '0') {
            setImgSrc(userInfo.avatarPath);
        }

        setFormState({
            username: userInfo.username || '',
            birthday: userInfo.birthday || 0,
            birthdayDisplay:
                userInfo.birthday !== 0
                    ? timestampToString(userInfo.birthday, 'YYYY-MM-DD')
                    : '添加生日',
            phoneNumber: userInfo.mobileNumber || '',
            wechat: userInfo.wechat || '',
            qq: userInfo.qqNumber || '',
            email: userInfo.email || '',
            description: userInfo.description || ''
        });

        const newSubmittedState = {
            username: Boolean(userInfo.username),
            birthday: userInfo.birthday !== 0,
            phoneNumber: Boolean(userInfo.mobileNumber),
            wechat: Boolean(userInfo.wechat),
            qq: Boolean(userInfo.qqNumber),
            email: Boolean(userInfo.email),
            description: Boolean(userInfo.description)
        };
        setSubmittedState(newSubmittedState);
    }, [userInfo, setFormState, setImgSrc, setSubmittedState]);

    return (
        <>
            <Header back={back} title={headerProps.title} />
            <div className={style.account}>
                <div className={style.uploadGroup}>
                    <Image
                        alt="大头贴"
                        className={style.avatar}
                        height={72}
                        src={imgSrc || Avatar}
                        width={72}
                    />
                    <label className={style.uploadBtn}>
                        编辑头像
                        <input
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                            type="file"
                        />
                    </label>
                    <p>*图片规格为100*100</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {submittedState.username ? (
                        <div className={style.item}>
                            <span className={style.title}>
                                <span className={style.text}>昵称</span>
                                <button
                                    className={style.button}
                                    onClick={editUserName}
                                    type="button"
                                >
                                    编辑
                                </button>
                            </span>
                            <span className={style.content}>{formState.username}</span>
                        </div>
                    ) : (
                        <FormField
                            label="昵称"
                            name="username"
                            onChange={handleInputChange}
                            placeholder="添加昵称"
                            submitted={false}
                            type="text"
                            value={formState.username || ''}
                        />
                    )}

                    <span className={style.displayTitle}>
                        生日{submittedState.birthday ? null : ' :'}
                    </span>
                    <div className={style.dateGroup}>
                        <div
                            className={`${
                                submittedState.birthday ? style.item : style.birthdayDisplay
                            } ${formState.birthday === 0 && style.placeHolderColor}`}
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

                    {submittedState.description ? (
                        <div className={style.item}>
                            <span className={style.title}>
                                <span className={style.text}>简介</span>
                                <button
                                    className={style.button}
                                    onClick={() => {
                                        editIntro();
                                    }}
                                    type="button"
                                >
                                    编辑
                                </button>
                            </span>
                            <span className={style.content}>{formState.description}</span>
                        </div>
                    ) : (
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
                    )}
                    <p className={style.tip}>
                        ＊「头像」、「昵称」、「简介」可重新编辑，其馀栏位提交后无法再次修改，请谨慎填写
                    </p>
                    {!isSubmitted && (
                        <button
                            className={`${style.submit} ${
                                Object.values(formState).some(value => value) ? style.active : ''
                            }`}
                            type="submit"
                        >
                            修改
                        </button>
                    )}
                </form>
            </div>
            <AvatarCropperDrawer
                imgSrc={newAvatar}
                isDrawerOpen={isAvatarCropperOpen}
                setImgSrc={handleUploadImg}
                setIsDrawerOpen={setIsAvatarCropperOpen}
                setNewAvatar={setNewAvatar}
            />
        </>
    );
}

export default Account;
