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
        }, this.barrageWall);
    }

    // 弹幕墙
    barrageWall() {
        let records = [
            {
                "rand": 2,
                "text": "joey刚刚使出[小拳拳捶你胸口]但是败给了我是第一"
            },
            {
                "rand": 3,
                "text": "我是第一刚刚使出[就如你轻轻地来一掌]但是败给了joey"
            }
        ];

        let cache = [
            {
                "rand": 2,
                "text": "joey刚刚使出[小拳拳捶你胸口]但是败给了我是第一"
            },
            {
                "rand": 3,
                "text": "我是第一刚刚使出[就如你轻轻地来一掌]但是败给了joey"
            }
        ];


    }
}