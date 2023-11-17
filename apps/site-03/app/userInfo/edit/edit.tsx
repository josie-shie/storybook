'use client';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import style from './edit.module.scss';
import Avatar from './img/avatar.png';
import Header from '@/components/header/headerTitleDetail';

interface FormState {
    nickName: string;
    birthday: string;
    phoneNumber: string;
    wechat: string;
    qq: string;
    email: string;
    intro: string;
}

interface SubmittedState {
    nickName: boolean;
    birthday: boolean;
    phoneNumber: boolean;
    wechat: boolean;
    qq: boolean;
    email: boolean;
    intro: boolean;
}

interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    submitted: boolean;
}

function FormField({ label, type, name, value, placeholder, onChange, submitted }: FormFieldProps) {
    return submitted ? (
        <div className={style.item}>
            <span className={style.title}>{label}：</span>
            <span className={style.content}>{value}</span>
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

function Edit() {
    const headerProps = {
        title: '个人資料'
    };

    const [formState, setFormState] = useState<FormState>({
        nickName: '',
        birthday: '',
        phoneNumber: '',
        wechat: '',
        qq: '',
        email: '',
        intro: ''
    });

    const [submittedState, setSubmittedState] = useState<SubmittedState>({
        nickName: false,
        birthday: false,
        phoneNumber: false,
        wechat: false,
        qq: false,
        email: false,
        intro: false
    });

    const [imgSrc, setImgSrc] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const uploadImg = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setImgSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(formState).every(
            (value: string) => value.trim() !== ''
        );
        if (allFieldsFilled) {
            setIsSubmitted(true);
        }
        const newSubmittedState: SubmittedState = {
            nickName: formState.nickName !== '',
            birthday: formState.birthday !== '',
            phoneNumber: formState.phoneNumber !== '',
            wechat: formState.wechat !== '',
            qq: formState.qq !== '',
            email: formState.email !== '',
            intro: formState.intro !== ''
        };
        setSubmittedState(newSubmittedState);
    };

    return (
        <>
            <Header title={headerProps.title} />
            <div className={style.edit}>
                <div className={style.uploadGroup}>
                    <Image
                        alt="大頭貼"
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
                        label="暱稱："
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
                        label="电话号码："
                        name="phoneNumber"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.phoneNumber}
                        type="text"
                        value={formState.phoneNumber}
                    />
                    <FormField
                        label="微信號："
                        name="wechat"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.wechat}
                        type="text"
                        value={formState.wechat}
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
                    <FormField
                        label="QQ號："
                        name="qq"
                        onChange={handleInputChange}
                        placeholder="新增"
                        submitted={submittedState.qq}
                        type="text"
                        value={formState.qq}
                    />

                    {submittedState.intro ? (
                        <div className={style.item}>
                            <span className={style.title}>简介：</span>
                            <span className={style.content}>{formState.intro}</span>
                        </div>
                    ) : (
                        <div className={style.item}>
                            <label htmlFor="intro">简介：</label>
                            <textarea
                                id="intro"
                                name="intro"
                                onChange={handleTextareaChange}
                                placeholder="介紹一下自己吧"
                                value={formState.intro}
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

export default Edit;
