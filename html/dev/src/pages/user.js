/**
 * Created by Hodge.Yuan@hotmail.com on 2017/11/3 0003.
 */
import {awu, common} from "../common/common.js";

export class user
{
    __constructor() {
        if (common.isLogin()) {
            awu.NewPage("main");
        } else {
            this.login();
        }
    }

    /**
     * 登录
     */
    login() {
        common.render(`{login.html}`, function () {
            $("body").attr("class", "login-page");
        });

        let THIS = this;
        let isClick = false;

        // login btn click
        $("#login").click(function () {
            if (isClick) {
                return ;
            }

            let This = this;

            let ln = $("#loginName");
            let lp = $("#loginPswd");

            let username = ln.val();
            let password = lp.val();

            if (!username || username.length < 1) {
                common.dialog({content: "用户名不能为空"}); return ;
            }

            if (!password || password.length < 1) {
                common.dialog({content: "密码不能为空"}); return ;
            }

            // 元素状态
            let setDomDisabled = function (b) {
                isClick = b;
                ln.attr("disabled", b);
                lp.attr("disabled", b);
                $(This).attr("disabled", b);
                $(This).html(b ? '<i class="fa fa-spinner fa-pulse"></i>' : '登录');
            };

            setDomDisabled(true);

            setTimeout(function () {
                if (password !== "123") {
                    common.dialog({content: "密码错误"});
                    setDomDisabled(false);
                } else {
                    awu.NewPage("main");
                }
            }, 1000);
        });

        // 跳转注册
        $('#targetR').click(function () {
            THIS.register();
        });
    }

    /**
     * 注册
     */
    register() {
        common.render(`{register.html}`, function () {
            $("body").attr("class", "login-page");
        });

        let THIS = this;
        let isClick = false;

        // login btn click
        $("#register").click(function () {
            if (isClick) {
                return ;
            }

            let This = this;

            let ln = $("#regName");
            let lp = $("#regPswd");
            let qq = $("#regQICQ");

            let username = ln.val();
            let password = lp.val();
            let qqnumber = qq.val();

            if (!username || username.length < 1) {
                common.dialog({content: "用户名不能为空"}); return ;
            }

            if (!password || password.length < 1) {
                common.dialog({content: "密码不能为空"}); return ;
            }

            if (!qqnumber || qqnumber.length < 1) {
                common.dialog({content: "QQ号码不能为空"}); return ;
            }

            // 元素状态
            let setDomDisabled = function (b) {
                isClick = b;
                ln.attr("disabled", b);
                lp.attr("disabled", b);
                qq.attr("disabled", b);
                $(This).attr("disabled", b);
                $(This).html(b ? '<i class="fa fa-spinner fa-pulse"></i>' : '注册');
            };

            setDomDisabled(true);

            setTimeout(function () {
                if (password !== "123") {
                    common.dialog({content: "注册失败"});
                    setDomDisabled(false);
                } else {
                    awu.NewPage("main");
                }
            }, 2000)
        });

        // 跳转登录
        $('#targetL').click(function () {
            THIS.login();
        });
    }
}