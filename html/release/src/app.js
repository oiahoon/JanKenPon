import {awu, common, api} from "./common/common.js"
export class app
{
    constructor() {
        common.render(`<nav class="navbar navbar-toggleable-md bg-white fixed-top navbar-transparent" color-on-scroll="50">    <div class="container">        <div class="navbar-translate">            <a class="navbar-brand" href="#" target="_blank">                Jan Ken Pon            </a>        </div>    </div></nav><div class="page-header" filter-color="eggyellow">    <div class="page-header-image" data-parallax="true" style="background-image: url(./assets/images/Geometric_Colors.png); transform: translate3d(0px, 0px, 0px);"></div>    <div class="content-center">        <div class="container">            <div class="col-md-4 content-center">                <div class="card card-login card-plain">                    <h1><i class="fa fa-circle-o-notch fa-spin"></i></h1>                </div>            </div>        </div>    </div></div><script src="./assets/js/now-ui-kit.js?v=1.0.1" type="text/javascript"></script>`);
        api.userInfo({}, function (data) {
            console.log(data);
            awu.NewPage("main");
        }, function (res) {
            awu.NewPage("auth");
        });
    }
}