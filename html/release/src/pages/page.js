/**
 * Created by Hodge.Yuan@hotmail.com on 2017/11/27 0027.
 */
import {JKP, common, api, user} from "../common/common.js";

/**
 * 主页
 */
class main
{
    constructor() {
        // this
        let M = this;

        // refresh id
        this.refresh = 0;

        // 猜拳页
        this.jkp = new class {
            __constructor() {
                common.render(`<div class="section punch-box">    <div class="about-description text-center">        <div class="features-5 choose-punch">            <div class="container">                <div class="row">                    <div class="col-md-8 mr-auto ml-auto score">                        <span id="my_score" class="badge badge-score">${user.total_score}</span>                    </div>                </div>                <div class="row">                    <div class="col-md-4 punch-pattern">                        <div class="card card-testimonial">                            <div class="card-avatar" data-flag="jkp" data-value="1">                                <a href="javascript:;">                                    <img class="img img-raised" src="http://assets.aoowu.org/images/jan.png">                                </a>                            </div>                            <div class="card-body">                                <p class="card-description">                                    告诉你们一个小技巧秘密，猜拳的时候出剪刀的胜率是33.33%。                                </p>                            </div>                            <div class="icon icon-primary">                                <i class="fa fa-quote-right"></i>                            </div>                            <div class="card-footer">                                <h4 class="card-title">Jan</h4>                                <p class="category">@夺命连环剪刀</p>                            </div>                        </div>                    </div>                    <div class="col-md-4 punch-pattern">                        <div class="card card-testimonial">                            <div class="card-avatar" data-flag="jkp" data-value="2">                                <a href="javascript:;">                                    <img class="img img-raised" src="http://assets.aoowu.org/images/ken.png">                                </a>                            </div>                            <div class="card-body">                                <p class="card-description">                                    又臭又硬的石头，总是出石头的人性格大概也是如此吧。                                </p>                            </div>                            <div class="icon icon-primary">                                <i class="fa fa-quote-right"></i>                            </div>                            <div class="card-footer">                                <h4 class="card-title">Ken</h4>                                <p class="category">@茅坑里的石头</p>                            </div>                        </div>                    </div>                    <div class="col-md-4 punch-pattern">                        <div class="card card-testimonial">                            <div class="card-avatar" data-flag="jkp" data-value="3">                                <a href="javascript:;">                                    <img class="img img-raised" src="http://assets.aoowu.org/images/pon.png">                                </a>                            </div>                            <div class="card-body">                                <p class="card-description">                                    包罗万象，五指张开，出布的时候有一种烟花绽放的感觉。                                </p>                            </div>                            <div class="icon icon-primary">                                <i class="fa fa-quote-right"></i>                            </div>                            <div class="card-footer">                                <h4 class="card-title">Pon</h4>                                <p class="category">@从天而降的帕子</p>                            </div>                        </div>                    </div>                </div>            </div>        </div>    </div></div>`);
                this.listenJKP();
            }

            listenJKP() {
                let flag = false;

                $("div[data-flag=jkp]").click(function () {
                    if (flag) {
                        return ;
                    }

                    if (user.total_score < 1) {
                        common.dialog({content: "你没有足够的金币"}); return ;
                    }

                    flag = true;
                    let icon = document.createElement("div");
                    let topH = $(this).offset().top -  document.documentElement.scrollTop  + 50;

                    icon.style.top  = topH + "px";
                    icon.innerHTML  = $(this).html();
                    icon.className  = $(this).attr("class");
                    icon.style.left = $(this).offset().left + "px";
                    icon.style.zIndex = 999999;
                    icon.style.position = "fixed";
                    $(this).parent().append(icon);

                    let top  = 0;
                    let left = 0;
                    let navBtn = $(".navbar-toggler");
                    let navTxt = $(".design_bullet-list-67");

                    if (navBtn.css("display") === "block") {
                        top  = navBtn.offset().top - document.documentElement.scrollTop;
                        left = navBtn.offset().left;
                    } else {
                        top  = navTxt.offset().top;
                        left = navTxt.offset().left;
                    }

                    top  = top + icon.offsetHeight * 0.1;
                    left = left - icon.offsetWidth * 0.1;

                    let style = document.createElement('style');
                    let styleRule40 = "opacity:1; transform:scale(2)";
                    let styleRuleTO = "top:" + top + "px;left:" + left + "px;opacity: 0.6;transform:scale(0.1)";
                    let styleRuleED = "top:" + topH + "px; left: " + $(this).offset().left + "px;opacity: 0.6;transform:scale(1)";
                    style.appendChild(document.createTextNode("@keyframes jkpICONAnimate{0% {" + styleRuleED + "} 40%{" + styleRule40 + "} 100%{" + styleRuleTO + "}}"));

                    document.head.appendChild(style);
                    icon.style.animation = "jkpICONAnimate 1.5s forwards";

                    setTimeout(function () {
                        icon.remove(); style.remove();
                    }, 1500);

                    api.punches({"punch": {"pattern": parseInt($(this).attr("data-value"))}}, function (data) {
                        user.total_score = data.punch.user.total_score;
                        $('#my_score').text(user.total_score);
                        flag = false;
                    }, function (errText, code) {
                        if (code !== 401) {
                            common.dialog({content: errText})
                        } else {
                            common.dialog({content: errText, cancel: function () {
                                M.refresh = 0; user.destroy() ; JKP.Page(auth);
                            }})
                        }
                        icon.remove(); flag = false;
                    });
                });
            }

        };

        // 排行榜
        this.rank = new class {
            __constructor() {
                common.render(`<div class="section rank-list">    <div class="container">        <div class="row">            <div class="col-md-12">                <h4>                    <small>排行榜(应该没有超过100个人在玩，吧？)</small>                </h4>            </div>            <div class="col-md-12">                <div class="card card-plain">                    <div class="card-body">                        <div class="table-responsive">                            <table class="table table-shopping">                                <thead class="">                                <tr>                                    <th class="text-center"> </th>                                    <th>                                        拳手                                    </th>                                    <th class="text-center">                                        积分                                    </th>                                    <th class="text-right">                                        胜率                                    </th>                                    <th class="text-right">                                        总局数                                    </th>                                </tr>                                </thead>                                <tbody id="rankList"></tbody>                            </table>                        </div>                    </div>                </div>            </div>        </div>    </div></div>`);

                this.table = $('#rankList');
                this.list();
            }

            // 列表
            list() {
                let info = "";
                let self = this;
                let loading = "<tr valign='middle' style='height:250px'><td align='center' rowspan='3' colspan='5'><h2><i class='fa fa-circle-o-notch fa-spin'></i></h2></td></tr>";

                self.table.html(loading);

                api.ranks({}, function (data) {
                    data.users.forEach(function (v, i) {
                        info += `<tr>
                         <td class="text-center">${i + 1}</td>
                         <td class="td-name">
                            <a href="javascript:;">${v.username}</a>` + (v.last_punch_at ? `<br><small>最后一局: ${v.last_punch_at}</small>` : '') + `
                         </td>
                         <td class="td-number">${v.total_score}</td>
                         <td class="td-number">${v.win_rate}</td>
                         <td class="td-number">${v.punch_count}</td> </tr>`;
                    });

                    self.table.html(info);
                });

            }
        };

        // 出拳历史
        this.histories = new class {
            __constructor() {
                common.render(`<div class="section punch-histories">    <div class="container">        <div class="row">            <div class="col-md-12">                <h4>                    <small>出拳记录(鱿鱼技术原因，只显示最近100条)</small>                </h4>            </div>            <div class="col-md-12">                <div class="card card-plain">                    <div class="card-body">                        <div class="table-responsive">                            <table class="table table-shopping">                                <thead class="">                                <tr>                                    <th class="text-center">                                        拳型                                    </th>                                    <th class="text-center">                                        押金                                    </th>                                    <th class="text-center">                                        积分快照                                    </th>                                    <th class="text-center">                                        对手                                    </th>                                    <th class="text-center">                                        结果                                    </th>                                </tr>                                </thead>                                <tbody id="historiesTable"></tbody>                            </table>                        </div>                    </div>                </div>            </div>        </div>    </div></div>`);

                this.page  = 1;
                this.table = $('#historiesTable');
                this.icons = {
                    'JAN': 'http://assets.aoowu.org/images/jan.png',
                    'KEN': "http://assets.aoowu.org/images/ken.png",
                    'PON': "http://assets.aoowu.org/images/pon.png"
                };

                this.list();
            }

            // 列表
            list() {
                let info = "";
                let self = this;
                let tips = {
                    "win": '<span class="badge badge-success"><i class="now-ui-icons ui-2_like"></i></span>',
                    "lose": '<span class="badge badge-default"><i class="now-ui-icons ui-2_like bottom-up"></i></span>',
                    "dogfall": "平局",
                    "waiting": "未开局"
                };

                let loading = "<tr valign='middle' style='height:250px'><td align='center' rowspan='3' colspan='5'><h2><i class='fa fa-circle-o-notch fa-spin'></i></h2></td></tr>";
                self.table.html(loading);

                api.punchesHistory(this.page, {}, function (data) {
                    data.punches.forEach(function (v, i) {
                        info += `<tr>
                         <td class="text-center media">
                            <div class="avatar">
                                <img class="media-object img-raised" alt="64x64" src="${self.icons[v.pattern]}">
                            </div>
                         </td>
                         <td class="text-center td-number">1</td>
                         <td class="text-center td-number">${v.score_snapshoot}</td>
                         <td class="text-center">${v.rival_name}</td>
                         <td class="text-center">${tips[v.result]}</td>
                         </tr>`;
                    });

                    self.table.html(info);
                });
            }
        };

        /**
         * Runtime
         * @type {{jkp: *, rank: *, histories: *}}
         */
        this.run = {"jkp": this.jkp, "rank": this.rank, "histories": this.histories};
    };

    __constructor() {
        common.header(1);
        this.initAppPage();
        this.refreshUserScore();
        this.jkp.__constructor();
    }

    // 主场景class
    initAppPage() {
        $("body").attr("class", "punch-page");
        this.listenSomething();
    }

    // 顶部导航
    listenSomething() {
        let self = this;

        // 导航
        $('.nav-page').click(function () {
            $("#bodyClick").click();
            self.run[$(this).attr("data-target")].__constructor();
        })
    }

    // 定时刷新用户金币
    refreshUserScore() {
        if (this.refresh !== 0) {
            return ;
        }

        this.refresh = setInterval(() => {
            api.userInfo({}, function (data) {
                user.set(data.user);
            });
        }, 36000)
    }

}

/**
 * 授权页
 */
class auth
{
    constructor() {
        // 根节点
        let node    = this;
        // 提交状态
        let sending = false;

        /**
         * 登陆页
         */
        this.login = new class {
            __constructor() {
                common.render(`<div class="section text-center login-form">    <div class="container">        <h2 class="title">猜拳大作战? - JanKenPon</h2>        <p class="description">不要继续吐槽这个怪怪的名字啦~ 我们是成都最大的开源交流群[14306350]</p>        <div class="row">            <div class="col-lg-5 text-center ml-auto mr-auto col-md-8">                <form id="loginForm" class="form" method="" action="">                    <div class="input-group form-group-no-border input-lg">                        <span class="input-group-addon"><i class="now-ui-icons users_circle-08"></i></span>                        <input id="loginName" type="text" class="form-control" placeholder="Userame...">                    </div>                    <div class="input-group form-group-no-border input-lg">                        <span class="input-group-addon"><i class="now-ui-icons ui-1_lock-circle-open"></i></span>                        <input id="loginPswd" type="password" placeholder="Password..." class="form-control">                    </div>                    <div class="send-button">                        <a id="login" href="javascript:;" class="btn btn-darkcyan btn-round btn-lg btn-block">登陆</a>                    </div>                    <div class="pull-right">                        <h6><a id="targetR" href="javascript:;" class="link footer-link">注册账号</a></h6>                    </div>                </form>            </div>        </div>    </div></div><script src="http://assets.aoowu.org/js/now-ui-kit.js?v=1.0.1" type="text/javascript"></script>`);

                // login btn click
                $('#login').click(this.signIn);

                // register btn click
                $('#targetR').click(() => { !sending && node.register.__constructor(); });
            };

            // check in
            signIn() {
                if (sending) {
                    return ;
                }

                let self = this;

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
                    sending = b;
                    ln.attr("disabled", b);
                    lp.attr("disabled", b);
                    $(self).attr("disabled", b);
                    $(self).html(b ? '<i class="fa fa-spinner fa-pulse"></i>' : '登录');
                };

                setDomDisabled(true);

                api.login({"user_session": {"username": username, "password": password}}, function (data) {
                    user.set(data.user);
                    JKP.Page(main);
                }, function (errText) {
                    common.dialog({content: errText});
                    setDomDisabled(false);
                });
            }
        };

        /**
         * 注册页
         */
        this.register = new class {
            __constructor() {
                common.render(`<div class="section text-center login-form">    <div class="container">        <h2 class="title">猜拳大作战? - JanKenPon</h2>        <p class="description">不要继续吐槽这个怪怪的名字啦~ 我们是成都最大的开源交流群[14306350]</p>        <div class="row">            <div class="col-lg-5 text-center ml-auto mr-auto col-md-8">                <form id="loginForm" class="form" method="" action="">                    <div class="input-group form-group-no-border input-lg">                        <span class="input-group-addon"><i class="now-ui-icons users_circle-08"></i></span>                        <input id="regName" type="text" class="form-control" placeholder="Userame...">                    </div>                    <div class="input-group form-group-no-border input-lg">                        <span class="input-group-addon"><i class="now-ui-icons ui-1_lock-circle-open"></i></span>                        <input id="regPswd" type="password" placeholder="Password..." class="form-control">                    </div>                    <div class="input-group form-group-no-border input-lg">                        <span class="input-group-addon"><i class="now-ui-icons ui-1_lock-circle-open"></i></span>                        <input id="regPswdCF" type="password" placeholder="Password confirmation" class="form-control">                    </div>                    <div class="input-group form-group-no-border input-lg">                        <span class="input-group-addon"><i class="now-ui-icons users_circle-08"></i></span>                        <input id="regQICQ" type="text" class="form-control" placeholder="QQ...">                    </div>                    <div class="send-button">                        <a id="register" href="javascript:;" class="btn btn-green btn-round btn-lg btn-block">注册</a>                    </div>                    <div class="pull-right">                        <h6><a id="targetL" href="javascript:;" class="link footer-link">已有账号？点击登录</a></h6>                    </div>                </form>            </div>        </div>    </div></div><script src="http://assets.aoowu.org/js/now-ui-kit.js?v=1.0.1" type="text/javascript"></script>`);

                // login btn click
                $('#register').click(this.signUp);

                // register btn click
                $('#targetL').click(() => { !sending && node.login.__constructor(); });
            };

            // sign up
            signUp() {
                if (sending) {
                    return ;
                }

                let self = this;

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

                // 元素状态
                let setDomDisabled = function (b) {
                    sending = b;
                    ln.attr("disabled", b);
                    lp.attr("disabled", b);
                    qq.attr("disabled", b);
                    $(self).attr("disabled", b);
                    $(self).html(b ? '<i class="fa fa-spinner fa-pulse"></i>' : '注册');
                };

                setDomDisabled(true);

                api.register({"user": {"qq": qq, "username": username, "password": password, "password_confirmation": pwdconfn}}, function (data) {
                    user.set(data.user);
                    JKP.Page(main);
                }, function (errText) {
                    common.dialog({content: errText});
                    setDomDisabled(false);
                });
            }
        };
    }

    __constructor() {
        if (user.id !== null) {
            JKP.Page(main); return ;
        }

        common.header(false);
        $("body").attr("class", "login-page");
        this.login.__constructor();
    }

}

export {auth, main}