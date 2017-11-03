/**
 * Created by Hodge.Yuan@hotmail.com on 2017/11/3 0003.
 */
import {awu, common} from "../common/common.js";

export class user
{
    constructor() {
        if (common.isLogin()) {
            awu.NewPage("jkp");
        } else {
            this.login();
        }
    }

    // 登录
    login() {
       // common.render(`{login.html}`);
    }

    // 注册
    register() {
        common.render(`{register.html}`);
    }
}