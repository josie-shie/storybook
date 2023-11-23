'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FormControl, Input, Button } from '@mui/material';
import { CustomSelect } from 'ui';
import AuthDrawer from '../authDrawer/authDrawer';
import style from './login.module.scss';
import phoneIcon from './img/phoneIcon.png';
import shieldIcon from './img/shieldIcon.png';
import lockIcon from './img/lockIcon.png';

const countryCallingCodeList = [{ label: '+86', value: 86 }];

function Login() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const title = (
        <p className={style.futureTitle}>
            <span className={style.future}>未来</span>体育
        </p>
    );

    return (
        <AuthDrawer isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
            <div className={style.login}>
                <FormControl>
                    <div className={style.phone}>
                        <div className={style.codeSelect}>
                            <Image alt="" height={24} src={phoneIcon.src} width={24} />
                            <CustomSelect
                                options={countryCallingCodeList}
                                showCloseButton
                                showDragBar={false}
                                value={countryCallingCodeList[0].value}
                            />
                        </div>

                        <Input
                            className={style.phoneInput}
                            id="phoneNumber"
                            placeholder="请输入手机号码"
                        />
                    </div>
                    <div className={style.password}>
                        <Image alt="" height={24} src={lockIcon.src} width={24} />
                        <div className={style.passwordBlock}>
                            <Input
                                className={style.passwordInput}
                                placeholder="6-16位英文+数字的密码"
                            />
                            <p className={style.forgotPass}>忘记密码</p>
                        </div>
                    </div>
                    <div className={style.vertifyCode}>
                        <Image alt="" height={24} src={shieldIcon.src} width={24} />
                        <div className={style.vertifyCodeBlock}>
                            <Input className={style.vertifyCodeInput} placeholder="验证码" />
                            <p className={style.getVertifyCode}>獲取驗證碼</p>
                        </div>
                    </div>
                </FormControl>
                <p
                    className={style.agreement}
                >{`登入即同意<XXX體育隱私條款>、<XXX體育用戶服務協議>`}</p>
            </div>
            <div className={style.buttons}>
                <Button fullWidth type="submit" variant="contained">
                    登入
                </Button>
                <Button fullWidth>忘記密碼</Button>
            </div>
        </AuthDrawer>
    );
}

export default Login;
