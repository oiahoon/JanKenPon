/**
 * Created by Hodge.Yuan@hotmail.com on 2017/10/20 0020.
 */
import {JKP, common, api, user} from "./common/common.js"
import {auth, main} from "./pages/page.js"

export class app
{
    constructor() {
        common.header(false);
        common.render(`{app.html}`);

        api.userInfo({}, function (data) {
            user.set(data.user); JKP.Page(main);
        }, function () {
            JKP.Page(auth);
        });
    }
}