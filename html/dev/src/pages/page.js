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
        // 猜拳页
        this.jkp = new class {
            __constructor() {
                common.render(`{jkp.html}`);
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

                    if ($(".navbar-collapse").css("display") === "block") {
                        let nt = $(".navbar-toggler");
                        top  = nt.offset().top;
                        left = nt.offset().left;
                    } else {
                        let db = $(".design_bullet-list-67");
                        top  = db.offset().top;
                        left = db.offset().left;
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
                                user.destroy() ; JKP.Page(auth);
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
                common.render(`{rank.html}`);

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
                common.render(`{histories.html}`);

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
                common.render(`{login.html}`);

                // login btn click
                $('#login').click(this.signIn);

                // register btn click
                $('#targetR').click(() => { node.register.__constructor(); });
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
                common.render(`{register.html}`);

                // login btn click
                $('#register').click(this.signUp);

                // register btn click
                $('#targetL').click(() => { node.login.__constructor(); });
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