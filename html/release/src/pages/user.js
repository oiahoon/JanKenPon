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
        common.render(`<!--登录页面<a href="javascript:;" id="reg">注册</a>--><div class="loading"></div>`);
    }

    // 注册
    register() {
        common.render(`注册页面`);
    }
}