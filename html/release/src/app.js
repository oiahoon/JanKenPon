import {JKP, common, api, user} from "./common/common.js"
import {auth, main} from "./pages/page.js"
export class app
{
    constructor() {
        common.header(false);
        common.render(`<div class="row bullet-screen"> </div><div class="section text-center login-form" style="margin-top:-70px">    <div class="container">        <div class="card card-login card-plain">            <h1><i class="fa fa-circle-o-notch fa-spin"></i></h1>        </div>    </div></div>`);
        api.userInfo({}, function (data) {
            user.set(data.user); JKP.Page(main);
        }, function () {
            JKP.Page(auth);
        });
    }
}