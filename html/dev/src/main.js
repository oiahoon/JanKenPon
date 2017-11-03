/**
 * Created by Hodge.Yuan@hotmail.com on 2017/10/20 0020.
 */
import {awu, common} from "./common/common.js"

export class main
{
    constructor() {
        common.isLogin() ? awu.NewPage("jkp") : awu.NewPage("user");
    }
}