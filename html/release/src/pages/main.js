import {awu, common} from "../common/common.js"
let jkp = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `<div class="section">    <!--     *********    PUNCH-BOX     *********      -->    <div class="about-description text-center">        <div class="features-5 choose-punch">            <div class="container">                <div class="row">                    <div class="col-md-8 mr-auto ml-auto">                        <h2 class="title">点击你的出拳</h2>                    </div>                </div>                <div class="row">                    <div class="col-sm-4">                        <div data-flag="jkp" data-value="Jan" class="info ">                            <div class="icon icon-success icon-circle">                                <i class="fa fa-hand-scissors-o"></i>                            </div>                            <h4 class="info-title">Jan</h4>                        </div>                    </div>                    <div class="col-sm-4">                        <div data-flag="jkp" data-value="Ken" class="info ">                            <div class="icon icon-info icon-circle">                                <i class="fa fa-hand-rock-o"></i>                            </div>                            <h4 class="info-title">Ken</h4>                        </div>                    </div>                    <div class="col-sm-4">                        <div data-flag="jkp" data-value="Pon" class="info ">                            <div class="icon icon-primary icon-circle">                                <i class="fa fa-hand-paper-o"></i>                            </div>                            <h4 class="info-title">Pon</h4>                        </div>                    </div>                </div>                <div class="row">                    <div class="col-md-8 mr-auto ml-auto">                        <h2 class="score"> 金币: 99</h2>                        <h2 class="rank">  当前排名: 38</h2>                    </div>                </div>            </div>        </div>    </div>    <!--     *********    END PUNCH-BOX      *********      --></div>`;
        wrapper.className = 'wrapper punch-box';
        this.listenJKP();
    }
    listenJKP() {
        let flag = false;
        $("div[data-flag=jkp]").click(function () {
            if (flag) {
                return ;
            }
            flag = true;
            let icon0 = $(this).find(".icon");
            let icon1 = document.createElement("div");
            icon1.style.position = "fixed";
            icon1.style.left = icon0.offset().left + "px";
            icon1.style.top = icon0.offset().top + "px";
            icon1.className = icon0[0].className;
            icon1.innerHTML = icon0.html();
            $(this).append(icon1);
            let left = 0;
            let top  = 0;
            if ($(".navbar-collapse").css("display") === "block") {
                let nt = $(".navbar-toggler");
                left = nt.offset().left;
                top  = nt.offset().top;
            } else {
                let db = $(".design_bullet-list-67");
                left = db.offset().left;
                top  = db.offset().top;
            }
            left = left - icon1.offsetWidth * 0.1;
            top  = top - icon1.offsetHeight * 0.5;
            let styleRule = document.styleSheets[0]; styleRule.deleteRule(6);
            let styleRuleTO = "top:" + top + "px;left:" + left + "px;opacity: 0.6;transform:scale(0.1)";
            let styleRule40 = "opacity:1; transform:scale(2)";
            let styleRuleED = "top:" + icon0.offset().top + "px; left: " + icon0.offset().left + "px;opacity: 0.6;transform:scale(1)";
            styleRule.insertRule("@keyframes jkpICONAnimate{0% {" + styleRuleED + "} 40%{" + styleRule40 + "} 100%{" + styleRuleTO + "}}", 6);
            icon1.style.animation = "jkpICONAnimate 1.5s forwards";
            setTimeout(function () {
                icon1.remove();
                flag = false;
            }, 1500)
        });
    }
};
let rank = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `<div class="section">    <div class="container">        <div class="row">            <div class="col-md-12">                <h4>                    <small>排行榜</small>                </h4>            </div>            <div class="col-md-12">                <div class="card card-plain">                    <div class="card-body">                        <div class="table-responsive">                            <table class="table table-shopping">                                <thead class="">                                <tr>                                    <th class="text-center"> </th>                                    <th>                                        User                                    </th>                                    <th class="text-center">                                        Score                                    </th>                                    <th class="text-right">                                        胜率                                    </th>                                    <th class="text-right">                                        总局数                                    </th>                                </tr>                                </thead>                                <tbody>                                <tr>                                    <td class="text-center">                                        1                                    </td>                                    <td class="td-name">                                        <a href="#">岛主</a>                                        <br>                                        <small>最后一局: 2017-11-09 15:31:50</small>                                    </td>                                    <td class="td-number">                                        268                                    </td>                                    <td class="td-number">                                        85%                                    </td>                                    <td class="td-number">                                        1,390                                    </td>                                </tr>                                </tbody>                            </table>                        </div>                    </div>                </div>            </div>        </div>    </div></div>`;
        wrapper.className = 'wrapper rank-list';
    }
};
let histories = new class
{
    __constructor() {
        let wrapper = $('.wrapper')[0];
        wrapper.innerHTML = `<div class="section">    <div class="container">        <div class="row">            <div class="col-md-12">                <h4>                    <small>出拳历史</small>                </h4>            </div>            <div class="col-md-12">                <div class="card card-plain">                    <div class="card-body">                        <div class="table-responsive">                            <table class="table table-shopping">                                <thead class="">                                <tr>                                    <th class="text-center"> </th>                                    <th>                                        User                                    </th>                                    <th class="text-center">                                        出拳                                    </th>                                    <th class="text-center">                                        押金                                    </th>                                    <th class="text-center">                                        结算后                                    </th>                                    <th class="text-right">                                        结果                                    </th>                                </tr>                                </thead>                                <tbody>                                <tr>                                    <td class="text-center">                                        1                                    </td>                                    <td class="td-name">                                        <a href="#">岛主</a>                                        <br>                                        <small>出拳时间: 2017-11-09 15:31:50</small>                                    </td>                                    <td class="text-center media">                                        <div class="avatar">                                            <img class="media-object img-raised" alt="64x64" src="assets/images/placeholder.jpg">                                        </div>                                    </td>                                    <td class="td-number">                                        1                                    </td>                                    <td class="td-number">                                        <small> 尚未开局 </small>                                    </td>                                    <td class="td-number">                                        <small> 等待开局 </small>                                    </td>                                </tr>                                </tbody>                            </table>                        </div>                    </div>                </div>            </div>        </div>        <!--     *********    END RANK LIST      *********      -->    </div></div>`;
        wrapper.className = 'wrapper rank-list';
    }
};
export class main
{
    constructor() {
        this.run = {"jkp": jkp, "rank": rank, "histories": histories};
    }
    __constructor() {
        this.initAppPage();
        this.run['jkp'].__constructor();
    }
    initAppPage() {
        common.render(`<nav class="navbar navbar-toggleable-md bg-white fixed-top navbar-transparent" color-on-scroll="50">    <div class="container">        <div class="navbar-translate">            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">                <span class="navbar-toggler-bar bar1"></span>                <span class="navbar-toggler-bar bar2"></span>                <span class="navbar-toggler-bar bar3"></span>            </button>            <a class="navbar-brand" href="javascript:;" >                Jan Ken Pon            </a>        </div>        <div class="collapse navbar-collapse justify-content-end" data-nav-image="./assets/images/blurred-image-1.jpg" data-color="eggyellow">            <ul class="navbar-nav">                <li class="nav-item">                    <a data-target="jkp" class="nav-page nav-link" href="javascript:;">                        <i class="now-ui-icons tech_controller-modern"></i>                        <p>开始</p>                    </a>                </li>                <li class="nav-item">                    <a data-target="rank" class="nav-page nav-link" href="javascript:;">                        <i class="now-ui-icons sport_trophy"></i>                        <p>排行榜</p>                    </a>                </li>                <li class="nav-item">                    <a data-target="histories" class="nav-page nav-link" href="javascript:;">                        <i class="now-ui-icons design_bullet-list-67"></i>                        <p>出拳记录</p>                    </a>                </li>            </ul>        </div>    </div></nav><div class='wrapper'></div><script src="./assets/js/now-ui-kit.js?v=1.0.1" type="text/javascript"></script>`);
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