/**
 * Created by Hodge.Yuan@hotmail.com on 2017/11/14 0014.
 */
import {awu, common, api, user} from "../common/common.js"

// 猜拳页
let jkp = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `{jkp.html}`;
        wrapper.className = 'wrapper punch-box';

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
            let icon0 = $(this).find(".icon");
            let icon1 = document.createElement("div");

            icon1.innerHTML  = icon0.html();
            icon1.className  = icon0[0].className;
            icon1.style.top  = icon0.offset().top + "px";
            icon1.style.left = icon0.offset().left + "px";
            icon1.style.position = "fixed";
            icon1.style.background = "";
            $(this).append(icon1);

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

            top  = top - icon1.offsetHeight * 0.5;
            left = left - icon1.offsetWidth * 0.1;

            let styleRule = document.styleSheets[0];
            let styleRule40 = "opacity:1; transform:scale(2)";
            let styleRuleTO = "top:" + top + "px;left:" + left + "px;opacity: 0.6;transform:scale(0.1)";
            let styleRuleED = "top:" + icon0.offset().top + "px; left: " + icon0.offset().left + "px;opacity: 0.6;transform:scale(1)";

            styleRule.deleteRule(6);
            styleRule.insertRule("@keyframes jkpICONAnimate{0% {" + styleRuleED + "} 40%{" + styleRule40 + "} 100%{" + styleRuleTO + "}}", 6);

            icon1.style.animation = "jkpICONAnimate 1.5s forwards";

            setTimeout(function () {
                icon1.remove();
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
                        user.destroy() ;awu.NewPage("auth");
                    }})
                }
                icon1.remove(); flag = false;
            });
        });
    }
};

// 排行榜
let rank = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `{rank.html}`;
        wrapper.className = 'wrapper rank-list';

        this.table = $('#rankList');
        this.list();
    }

    // 列表
    list() {
        let info = "";
        let self = this;

        api.ranks({}, function (data) {
            data.users.forEach(function (v, i) {
                info += `<tr>
                        <td class="text-center">${i + 1}</td>
                        <td class="td-name"><a href="#">${v.username}</a><br><small>最后一局: ${v.last_punch_at}</small></td>
                        <td class="td-number">${v.total_score}</td>
                        <td class="td-number">${v.win_rate}</td>
                        <td class="td-number">0</td>
                        </tr>`;
            });

            self.table.html(info);
        });

    }
};

// 出拳历史
let histories = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `{histories.html}`;
        wrapper.className = 'wrapper rank-list';

        this.page  = 1;
        this.table = $('#historiesTable');
        this.icons = {'JAN': 'fa fa-hand-scissors-o', 'KEN': "fa fa-hand-rock-o", 'PON': "fa fa-hand-paper-o"};
        this.list();
    }

    // 列表
    list() {
        let info = "";
        let self = this;

        api.punchesHistory(this.page, {}, function (data) {
            data.punches.forEach(function (v, i) {
                info += `<tr>
                         <td class="text-center media"><i class="${self.icons[v.pattern]}"></i></td>
                         <td class="td-number">1</td>
                         <td class="td-number"><small> ${v.score_snapshoot} </small></td>
                         <td class="td-number"><small> ${v.result} </small></td>
                         </tr>`;
            });

            self.table.html(info);
        });
    }
};

export class main
{
    constructor() {
        this.run = {"jkp": jkp, "rank": rank, "histories": histories};
    }

    __constructor() {
        if (!user.id) {
            awu.NewPage("auth"); return ;
        }

        this.initAppPage();
        this.run['jkp'].__constructor();
    }

    initAppPage() {
        common.render(`{nav.html}`);
        $("body").attr("class", "punch-page");

        this.listenSomething();
    }

    listenSomething() {
        let self = this;

        // 导航
        $('.nav-page').click(function () {
            $("#bodyClick").click();
            self.run[$(this).attr("data-target")].__constructor();
        })
    }

}