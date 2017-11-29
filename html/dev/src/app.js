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
        // let bullets = '';
        bulletsShooting();
        setInterval(bulletsShooting, 10000);
        function bulletsShooting() {
            api.bullets({}, function (data) {
                data.forEach(function (item, index) {
                    var currentBullets = $(".bullet-screen > .bullet")
                    var bulletsCount = currentBullets.length;
                    if(bulletsCount >= 50){
                        var toDelNumber = getRandomInt(0,50);
                        currentBullets.eq(toDelNumber).fadeOut('slow',function(){ $(this).remove();});
                    }
                    var item_rand=getRandomInt(2,6);
                    $(".bullet-screen").append(
                        '<div class="bullet hidden col-md-' + (item_rand) + ' ml-md-auto"><h' + (6 - item_rand) + '>' + item['text'] + '</h1></div>'
                    ).fadeIn('slow');
                })
            });
        }

        let cache = [ ];

        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }
    }

}