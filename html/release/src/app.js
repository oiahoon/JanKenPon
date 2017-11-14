import {awu, common} from "./common/common.js"
export class app
{
    constructor() {
        common.isLogin() ? awu.NewPage("main") : awu.NewPage("user");
    }
}