/**
 * Created by Hodge.Yuan@hotmail.com on 2017/10/20 0020.
 */
import {awu, common, api} from "./common/common.js"

export class app
{
    constructor() {
        common.render(`{app.html}`);

        api.userInfo({}, function (data) {
            console.log(data);
            awu.NewPage("main");
        }, function (res) {
            awu.NewPage("auth");
        });
    }
}