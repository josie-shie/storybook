'use client';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { UpdateMemberInfoRequest } from 'data-center';
import { timestampToString, uploadImage } from 'lib';
import { updateMemberInfo } from 'data-center';
import { useUserStore } from '../../userStore';
import style from './account.module.scss';
import Avatar from './img/avatar.png';
import { useAccountStore } from './accountStore';
import Header from '@/components/header/headerTitleDetail';
import { useNotificationStore } from '@/app/notificationStore';

interface UploadResponse {
    filePath: string;
}

interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value: string | number;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    submitted: boolean;
}

function FormField({ label, type, name, value, placeholder, onChange, submitted }: FormFieldProps) {
    let displayValue = value;
    if (name === 'birthday' && typeof value === 'number') {
        displayValue = timestampToString(value, 'YYYY-MM-DD');
    }
    return submitted ? (
        <div className={style.item}>
            <span className={style.title}>{label}</span>
            <span className={style.content}>{displayValue}</span>
        </div>
    ) : (
        <div className={style.item}>
            <label htmlFor={name}>{label}：</label>
            <input
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
        title: '个人資料'
    };
    const router = useRouter();
    const userInfo = useUserStore.use.userInfo();
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

    const back = () => {
        router.push('/userInfo');
    };

    useEffect(() => {
        if (userInfo.avatarPath && userInfo.avatarPath !== '0') {
            setImgSrc(userInfo.avatarPath);
        }

        setFormState({
            nickName: userInfo.username || '',
            birthday: userInfo.birthday || 0,
            phoneNumber: userInfo.mobileNumber || '',
            wechat: userInfo.wechat || '',
            qq: userInfo.qqNumber || '',
            email: userInfo.email || '',
            description: userInfo.description || ''
        });

        const newSubmittedState = {
            nickName: Boolean(userInfo.username),
            birthday: userInfo.birthday !== 0,
            phoneNumber: Boolean(userInfo.mobileNumber),
            wechat: Boolean(userInfo.wechat),
            qq: Boolean(userInfo.qqNumber),
            email: Boolean(userInfo.email),
            description: Boolean(userInfo.description)
        };
        setSubmittedState(newSubmittedState);
    }, [userInfo, setFormState, setImgSrc, setSubmittedState]);

    const uploadImg = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setImgSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            try {
                const data: UploadResponse = await uploadImage(file);
                if (data.filePath) {
                    setImgUpload(data.filePath);
                    setIsVisible('上传成功', 'success');
                } else {
                    setIsVisible('上传失敗', 'error');
                }
            } catch (error) {
                console.error('上传图片过程中发生错误', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newFormState = {
            ...formState,
            [name]: value
        };
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
            nickName: userInfo.username !== '',
            birthday: formState.birthday !== 0,
            phoneNumber: formState.phoneNumber !== '',
            wechat: formState.wechat !== '',
            qq: formState.qq !== '',
            email: formState.email !== '',
            description: formState.description !== ''
        };
        setSubmittedState(newSubmittedState);

        const dateValue = new Date(formState.birthday);

        const obj: UpdateMemberInfoRequest = {
            avatarPath: imgUpload || userInfo.avatarPath,
            birthday: userInfo.birthday || dateValue.getTime() / 1000,
            wechat: formState.wechat,
            qqNumber: formState.qq,
            email: formState.email,
            description: formState.description
        };

        const res = await updateMemberInfo(obj);

        if (!res.success) {
            const errorMessage = res.error ? res.error : '修改个人资讯失败，请确认资料无误';
            setIsVisible(errorMessage, 'error');
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
                        編輯頭像
                        <input
                            accept="image/*"
                            onChange={uploadImg}
                            style={{ display: 'none' }}
                            type="file"
                        />
                    </label>
                    <p>*圖片規格為100*100</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormField
                        label="昵称："
                        name="nickName"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.nickName}
                        type="text"
                        value={formState.nickName}
                    />
                    <FormField
                        label="出生日期："
                        name="birthday"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.birthday}
                        type="date"
                        value={formState.birthday}
                    />
                    <FormField
                        label="手机号："
                        name="phoneNumber"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.phoneNumber}
                        type="text"
                        value={formState.phoneNumber}
                    />
                    <FormField
                        label="微信号："
                        name="wechat"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.wechat}
                        type="text"
                        value={formState.wechat}
                    />
                    <FormField
                        label="QQ号："
                        name="qq"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.qq}
                        type="text"
                        value={formState.qq}
                    />
                    <FormField
                        label="邮箱："
                        name="email"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.email}
                        type="email"
                        value={formState.email}
                    />

                    {submittedState.description ? (
                        <div className={style.item}>
                            <span className={style.title}>
                                <span className={style.text}>简介：</span>
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
                                id="description"
                                name="description"
                                onChange={handleTextareaChange}
                                placeholder="介绍一下自己吧"
                                value={formState.description}
                            />
                        </div>
                    )}
                    <p className={style.tip}>
                        ＊「头像」「简介」可重新编辑，其馀栏位提交后无法再次修改，请谨慎填写
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
        </>
    );
}

export default Account;
