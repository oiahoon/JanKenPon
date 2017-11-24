import {awu, common, api, user} from "../common/common.js"
let jkp = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `<div class="section">    <!--     *********    PUNCH-BOX     *********      -->    <div class="about-description text-center">        <div class="features-5 choose-punch">            <div class="container">                <div class="row">                    <div class="col-md-8 mr-auto ml-auto">                        <h2 class="title">点击你的出拳</h2>                    </div>                </div>                <div class="row">                    <div class="col-sm-4">                        <div data-flag="jkp" data-value="1" class="info ">                            <div class="icon icon-success icon-circle">                                <i class="fa fa-hand-scissors-o"></i>                            </div>                            <h4 class="info-title">Jan</h4>                        </div>                    </div>                    <div class="col-sm-4">                        <div data-flag="jkp" data-value="2" class="info ">                            <div class="icon icon-info icon-circle">                                <i class="fa fa-hand-rock-o"></i>                            </div>                            <h4 class="info-title">Ken</h4>                        </div>                    </div>                    <div class="col-sm-4">                        <div data-flag="jkp" data-value="3" class="info ">                            <div class="icon icon-primary icon-circle">                                <i class="fa fa-hand-paper-o"></i>                            </div>                            <h4 class="info-title">Pon</h4>                        </div>                    </div>                </div>                <div class="row">                    <div class="col-md-8 mr-auto ml-auto">                        <h2 class="score"> 金币: <span id="my_score">${user.total_score}</span></h2>                    </div>                </div>            </div>        </div>    </div>    <!--     *********    END PUNCH-BOX      *********      --></div>`;
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
let rank = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `<div class="section">    <div class="container">        <div class="row">            <div class="col-md-12">                <h4>                    <small>排行榜</small>                </h4>            </div>            <div class="col-md-12">                <div class="card card-plain">                    <div class="card-body">                        <div class="table-responsive">                            <table class="table table-shopping">                                <thead class="">                                <tr>                                    <th class="text-center"> </th>                                    <th>                                        User                                    </th>                                    <th class="text-center">                                        Score                                    </th>                                    <th class="text-right">                                        胜率                                    </th>                                    <th class="text-right">                                        总局数                                    </th>                                </tr>                                </thead>                                <tbody id="rankList"></tbody>                            </table>                        </div>                    </div>                </div>            </div>        </div>    </div></div>`;
        wrapper.className = 'wrapper rank-list';
        this.table = $('#rankList');
        this.list();
    }
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
let histories = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `<div class="section">    <div class="container">        <div class="row">            <div class="col-md-12">                <h4>                    <small>出拳历史</small>                </h4>            </div>            <div class="col-md-12">                <div class="card card-plain">                    <div class="card-body">                        <div class="table-responsive">                            <table class="table table-shopping">                                <thead class="">                                <tr>                                    <th class="text-center">                                        出拳                                    </th>                                    <th class="text-center">                                        押金                                    </th>                                    <th class="text-center">                                        积分快照                                    </th>                                    <th class="text-center">                                        对手                                    </th>                                    <th class="text-center">                                        结果                                    </th>                                </tr>                                </thead>                                <tbody id="historiesTable"></tbody>                            </table>                        </div>                    </div>                </div>            </div>        </div>        <!--     *********    END RANK LIST      *********      -->    </div></div>`;
        wrapper.className = 'wrapper rank-list';
        this.page  = 1;
        this.table = $('#historiesTable');
        this.icons = {'JAN': 'fa fa-hand-scissors-o', 'KEN': "fa fa-hand-rock-o", 'PON': "fa fa-hand-paper-o"};
        this.list();
    }
    list() {
        let info = "";
        let self = this;
        let tips = {"win": "胜利", "lose": "输了", "dogfall": "平局", "waiting": "未开局"};
        let loading = "<tr valign='middle' style='height:250px'><td align='center' rowspan='3' colspan='5'><h2><i class='fa fa-circle-o-notch fa-spin'></i></h2></td></tr>";
        self.table.html(loading);
        api.punchesHistory(this.page, {}, function (data) {
            data.punches.forEach(function (v, i) {
                info += `<tr>
                         <td class="text-center"><h3 style="margin:0"><i class="${self.icons[v.pattern]}"></i></h3></td>
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
        common.render(`<nav class="navbar navbar-toggleable-md bg-white fixed-top navbar-transparent" color-on-scroll="50">    <div class="container">        <div class="navbar-translate">            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">                <span class="navbar-toggler-bar bar1"></span>                <span class="navbar-toggler-bar bar2"></span>                <span class="navbar-toggler-bar bar3"></span>            </button>            <a class="navbar-brand" href="javascript:;" >                Jan Ken Pon            </a>        </div>        <div class="collapse navbar-collapse justify-content-end" data-nav-image="./assets/images/blurred-image-1.jpg" data-color="eggyellow">            <ul class="navbar-nav">                <li class="nav-item">                    <a data-target="jkp" class="nav-page nav-link" href="javascript:;">                        <i class="now-ui-icons tech_controller-modern"></i>                        <p>开始</p>                    </a>                </li>                <li class="nav-item">                    <a data-target="rank" class="nav-page nav-link" href="javascript:;">                        <i class="now-ui-icons sport_trophy"></i>                        <p>排行榜</p>                    </a>                </li>                <li class="nav-item">                    <a data-target="histories" class="nav-page nav-link" href="javascript:;">                        <i class="now-ui-icons design_bullet-list-67"></i>                        <p>出拳记录</p>                    </a>                </li>            </ul>        </div>    </div></nav><div class='wrapper'></div><script src="http://assets.aoowu.org/js/now-ui-kit.js?v=1.0.1" type="text/javascript"></script>`);
        $("body").attr("class", "punch-page");
        this.listenSomething();
    }
    listenSomething() {
        let self = this;
        $('.nav-page').click(function () {
            $("#bodyClick").click();
            self.run[$(this).attr("data-target")].__constructor();
        })
    }
}