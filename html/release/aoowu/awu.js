import {main} from "..//src/pages/main.js"
let classMap  = {"main": main};
let instances = {};
let loadingFn = {};
class AooWu
{
    constructor() {
        this.now = "";
    }
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
export const awu = new AooWu();