'use client';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import style from '../helpCenter.module.scss';

function LoginAndResign() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo/helpCenter');
    };

    return (
        <>
            <Header back={back} title="帐号相关" />
            <div className={style.detail}>
                <div className={style.zoon}>
                    <h2>如何注册新帐户</h2>
                    <div>请按照以下步骤操作：</div>
                    <div>1. 填写基本信息：在注册页面上填写您的手机号和设定的密码。</div>
                    <div>2. 手机号确认: 请使用有效的手机号码，我们将透过这个号码发送验证码。</div>
                    <div>3. 阅读并接受条款: 在提交前，请细读《用户协议》和《隐私政策》。</div>
                    <div>4. 提交注册申请: 确认信息无误后，点击「注册」按钮。</div>
                    <div>5. 注册完成: 成功注册后，即可用手机号和密码登入App</div>
                    <div>注册遇到问题时，请联系客服寻求协助。</div>
                </div>
                <div className={style.zoon}>
                    <h2>忘记手机号或密码</h2>
                    <div>如忘记密码，请按以下步骤重设：</div>
                    <div>1. 访问登入页面：点击「忘记密码」。</div>
                    <div>2. 手机号确认：输入手机号并点击「获取验证码」。若有问题，请联系客服。</div>
                    <div>3. 设定新密码：输入验证码后设定新密码（6~16字符，包含英文+数字）。</div>
                    <div>4. 确认新密码：再次输入新密码以确认。</div>
                    <div>5.提交新密码：点击「提交」完成密码重设。</div>
                    <div>如忘记注册的手机号，请联系客服寻求协助。</div>
                </div>
                <div className={style.zoon}>
                    <h2>如何注销帐户</h2>
                    <div>欲注销帐户，请联系客服提供所需资料。</div>
                </div>
                <div className={style.zoon}>
                    <h2>如何变更资料</h2>
                    <div>变更密码：</div>
                    <div>1. 访问「我的」页面：登入后点击右上角。</div>
                    <div>2. 进入编辑模式：点击「编辑」进入个人资料编辑页面。</div>
                    <div>
                        3.
                        修改资料：可变更头像、暱称、生日、微信号、QQ号、邮箱、简介。请注意部分资料仅可修改一次。
                    </div>
                    <div>4. 提交更新：点击「提交」完成个人资料的变更。</div>
                </div>
            </div>
        </>
    );
}

export default LoginAndResign;
