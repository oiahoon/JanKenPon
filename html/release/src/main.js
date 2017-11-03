import {awu, common} from "./common/common.js"
export class main
{
    constructor() {
        common.isLogin() ? awu.NewPage("jkp") : awu.NewPage("user");
    }
}