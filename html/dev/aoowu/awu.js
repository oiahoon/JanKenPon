/**
 * Created by Hodge.Yuan@hotmail.com on 2017/10/20 0020.
 */

/**
 * 此处有次元裂缝，勿碰！！！
 * @type {{}}
 */
#{import}
let classMap  = {#{classMap}};
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
    constructor() {
        this.now = "";
    }

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
        }

        this.now = className;
        instances[className].__proto__.hasOwnProperty("__constructor") && instances[className].__constructor();
    }

}

/**
 * 导出统一使用awu
 * @type {AooWu}
 */
export const awu = new AooWu();