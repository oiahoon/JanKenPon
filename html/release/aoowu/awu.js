/**
 * Created by Hodge.Yuan@hotmail.com on 2017/10/20 0020.
 */

/**
 * 此处有次元裂缝，勿碰！！！
 * @type {{}}
 */
import {jkp} from ".././src/pages/jkp.js"
import {list} from ".././src/pages/list.js"
import {user} from ".././src/pages/user.js"

let classMap  = {"jkp": jkp,"list": list,"user": user};
/**
 * pages class instances
 * @type {{}}
 */
let instances = {};
/**
 * loading file name
 * @type {{}}
 */
let loadingFn = {};

// AooWu
class AooWu
{
    /**
     * 在标签内填充HTML
     * @param html
     * @param label
     * @constructor
     */
    View(html, label) {
        if (!label) {
            label = "tag=body"
        }

        if (this.Query(label).hasOwnProperty("innerHTML")) {
            this.Query(label).innerHTML = html;
        } else {
            this.Query(label)[0].innerHTML = html;
        }
    }

    /**
     * 选择器
     * Query("id")
     * Query("name=name")
     * Query("tag=tagName")
     * Query("class=className")
     * @param exp
     * @returns {*}
     * @constructor
     */
    Query(exp) {
        let result = exp.split("=");

        if (result.length < 2) {
            return document.getElementById(result[0]);
        }

        switch (result[0]) {
            case "name":
                return document.getElementsByName(result[1]);
            case "tag":
                return document.getElementsByTagName(result[1]);
            case "class":
                return document.getElementsByClassName(result[1]);
            default:
                return {};
        }
    }

    /**
     * 加载一个css文件
     * @param id
     * @param filePath
     * @param call
     * @constructor
     */
    NewCss(id, filePath, call) {
        if (loadingFn.hasOwnProperty(filePath)) {
            return ;
        }

        loadingFn[filePath] = true;

        let style = document.createElement("link");
        style.setAttribute("type", "text/css");
        style.setAttribute("rel", "stylesheet");

        id && style.setAttribute("id", id);
        filePath && style.setAttribute("href", filePath);
        document.getElementsByTagName("head")[0].appendChild(style);

        style.onload = function () {
            delete loadingFn[filePath];
            if (typeof call === "function") {
                call();
            }
        };
    }

    /**
     * 实例化/调用 一个page/class
     * @param className
     * @returns {{}}
     * @constructor
     */
    NewPage(className) {
        if (!classMap.hasOwnProperty(className)) {
            throw "awu.js: class " + className + " undefined";
        }

        if (!instances.hasOwnProperty(className)) {
            instances[className] = new classMap[className];
        } else {
            instances[className].constructor();
        }
    }

    /**
     * Ajax
     * @param args
     * @constructor
     */
    Ajax(args) {
        let url = args.url ? args.url : null;
        let data = args.data ? args.data :null;
        let method = args.type ? args.type : "GET";
        let onError = args.error ? args.error : function () {};
        let onSuccess = args.success ? args.success : function () {};
        let contentType = args.contentType ? args.contentType : "application/json;charset=utf-8";

        if (typeof url !== "string") {
            throw "awu.Ajax: Unknown URL Type"
        }

        let XMLHttp = new XMLHttpRequest();
        XMLHttp.open(method, url, true);
        XMLHttp.withCredentials = true; // 跨域

        try {
            XMLHttp.send(JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }

        XMLHttp.onload = function () {
            if (XMLHttp.status === 200) {
                onSuccess(XMLHttp.responseText);
            } else {
                onError();
            }
        };

        XMLHttp.onerror = onError;
    }

}

/**
 * 导出统一使用awu
 * @type {AooWu}
 */
export const awu = new AooWu();