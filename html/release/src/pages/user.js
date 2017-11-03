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
    login() {
    }
    register() {
        common.render(`注册页面`);
    }
}