import {awu, common, api, user} from "../common/common.js";
export class auth
{
    __constructor() {
        if (user.id !== null) {
            awu.NewPage("main");
        } else {
            this.login();
        }
    }
    login() {
        common.render(`<nav class="navbar navbar-toggleable-md bg-white fixed-top navbar-transparent" color-on-scroll="50">    <div class="container">        <div class="navbar-translate">            <a class="navbar-brand" href="#" target="_blank">                Jan Ken Pon            </a>        </div>    </div></nav><div class="page-header" filter-color="eggyellow">    <div class="page-header-image" data-parallax="true" style="background-image: url(./assets/images/Geometric_Colors.png); transform: translate3d(0px, 0px, 0px);"></div>    <div class="content-center">        <div class="container">            <div class="col-md-4 content-center">                <div class="card card-login card-plain">                    <form id="loginForm" class="form">                        <div class="card-body">                            <div class="input-group form-group-no-border input-lg">                                    <span class="input-group-addon">                                        <i class="now-ui-icons users_circle-08"></i>                                    </span>                                <input id="loginName" type="text" class="form-control" placeholder="Userame...">                            </div>                            <div class="input-group form-group-no-border input-lg">                                    <span class="input-group-addon">                                        <i class="now-ui-icons ui-1_lock-circle-open"></i>                                    </span>                                <input id="loginPswd" type="password" placeholder="Password..." class="form-control">                            </div>                        </div>                        <div class="card-footer text-center">                            <a id="login" href="javascript:;" class="btn btn-green btn-round btn-lg btn-block">登陆</a>                        </div>                        <div class="pull-right">                            <h6>                                <a id="targetR" href="javascript:;" class="link footer-link">注册账号</a>                            </h6>                        </div>                    </form>                </div>            </div>        </div>    </div></div><script src="http://assets.aoowu.org/js/now-ui-kit.js?v=1.0.1" type="text/javascript"></script>`, function () {
            $("body").attr("class", "login-page");
        });
        let THIS = this;
        let isClick = false;
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
            let setDomDisabled = function (b) {
                isClick = b;
                ln.attr("disabled", b);
                lp.attr("disabled", b);
                $(This).attr("disabled", b);
                $(This).html(b ? '<i class="fa fa-spinner fa-pulse"></i>' : '登录');
            };
            setDomDisabled(true);
            api.login({"user_session": {"username": username, "password": password}}, function (data) {
                user.set(data.user);
                awu.NewPage("main");
            }, function (errText) {
                common.dialog({content: errText});
                setDomDisabled(false);
            });
        });
        $('#targetR').click(function () {
            THIS.register();
        });
    }
    register() {
        common.render(`<nav class="navbar navbar-toggleable-md bg-white fixed-top navbar-transparent" color-on-scroll="50">    <div class="container">        <div class="navbar-translate">            <a class="navbar-brand" href="#" target="_blank">                Jan Ken Pon            </a>        </div>    </div></nav><div class="page-header" filter-color="eggyellow">    <div class="page-header-image" data-parallax="true" style="background-image: url(./assets/images/Geometric_Colors.png); transform: translate3d(0px, 0px, 0px);"></div>    <div class="content-center">        <div class="container">            <div class="col-md-4 content-center">                <div class="card card-login card-plain">                    <form id="regsiterForm" class="form" >                        <div class="card-body">                            <div class="input-group form-group-no-border input-lg">                                    <span class="input-group-addon">                                        <i class="now-ui-icons users_circle-08"></i>                                    </span>                                <input id="regName" type="text" class="form-control" placeholder="Userame...">                            </div>                            <div class="input-group form-group-no-border input-lg">                                    <span class="input-group-addon">                                        <i class="now-ui-icons ui-1_lock-circle-open"></i>                                    </span>                                <input id="regPswd" type="password" placeholder="Password..." class="form-control">                            </div>                            <div class="input-group form-group-no-border input-lg">                                    <span class="input-group-addon">                                        <i class="now-ui-icons ui-1_lock-circle-open"></i>                                    </span>                                <input id="regPswdCF" type="password" placeholder="Password confirmation" class="form-control">                            </div>                            <div class="input-group form-group-no-border input-lg">                                    <span class="input-group-addon">                                        <i class="now-ui-icons users_circle-08"></i>                                    </span>                                <input id="regQICQ" type="text" class="form-control" placeholder="QQ...">                            </div>                        </div>                        <div class="card-footer text-center">                            <a id="register" href="javascript:;" class="btn btn-green btn-round btn-lg btn-block">注册</a>                        </div>                        <div class="pull-right">                            <h6>                                <a id="targetL" href="javascript:;" class="link footer-link">已有账号？点击登录</a>                            </h6>                        </div>                    </form>                </div>            </div>        </div>    </div></div><script src="http://assets.aoowu.org/js/now-ui-kit.js?v=1.0.1" type="text/javascript"></script>`, function () {
            $("body").attr("class", "login-page");
        });
        let THIS = this;
        let isClick = false;
        $("#register").click(function () {
            if (isClick) {
                return ;
            }
            let This = this;
            let ln = $("#regName");
            let lp = $("#regPswd");
            let qq = $("#regQICQ");
            let cf = $("#regPswdCF");
            let username = ln.val();
            let password = lp.val();
            let qqnumber = qq.val();
            let pwdconfn = cf.val();
            if (!username || username.length < 1) {
                common.dialog({content: "用户名不能为空"}); return ;
            }
            if (!password || password.length < 1) {
                common.dialog({content: "密码不能为空"}); return ;
            }
            if (password !== pwdconfn) {
                common.dialog({content: "两次密码不一致"}); return ;
            }
            if (!qqnumber || qqnumber.length < 1) {
                common.dialog({content: "QQ号码不能为空"}); return ;
            }
            let setDomDisabled = function (b) {
                isClick = b;
                ln.attr("disabled", b);
                lp.attr("disabled", b);
                qq.attr("disabled", b);
                $(This).attr("disabled", b);
                $(This).html(b ? '<i class="fa fa-spinner fa-pulse"></i>' : '注册');
            };
            setDomDisabled(true);
            api.register({"user": {"qq": qq, "username": username, "password": password, "password_confirmation": pwdconfn}}, function (data) {
                user.set(data.user);
                awu.NewPage("main");
            }, function (errText) {
                common.dialog({content: errText});
                setDomDisabled(false);
            });
        });
        $('#targetL').click(function () {
            THIS.login();
        });
    }
}