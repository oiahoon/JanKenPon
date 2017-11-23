class http
{
    static domain() {
        return "http://jkp.aoowu.org/api";
    }
    static ajax(settings) {
        let url  = settings.url;
        let data = settings.data;
        let type = settings.type ? settings.type : "GET";
        let error    = settings.error ? settings.error : function () {};
        let success  = settings.success ? settings.success : function () {};
        let complete = settings.complete ? settings.complete : function () {};
        if (typeof url !== "string") {
            throw "http.ajax: Unknown URL Type"
        }
        let XMLHttp = new XMLHttpRequest();
        XMLHttp.open(type, url, true);
        XMLHttp.withCredentials = false;
        XMLHttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        XMLHttp.send(JSON.stringify(data));
        XMLHttp.onload = function () {
            if (XMLHttp.status < 400) {
                success(JSON.parse(XMLHttp.responseText));
            } else {
                let tip = "";
                let err = (JSON.parse(XMLHttp.response)).error;
                switch (typeof err) {
                    case "object":
                        err.forEach(function (v, i) {
                            tip += "<p>" + v + "</p>";
                        });
                        break;
                    case "string":
                        tip = err;
                        break;
                    default:
                        tip = "服务异常，请稍后再试";
                }
                error(tip, XMLHttp.status);
            }
        };
        XMLHttp.onerror   = function () {
            error("网络故障，请稍后再试", 500);
        };
        XMLHttp.onloadend = complete;
    }
}
export class api
{
    static getArgs(api, type, ...args) {
        let u = http.domain() + api;
        let [d, s, e, c] = [{}, null, null, null];
        args.forEach(function (v, i) {
            switch (i) {
                case 0:
                    d = v;
                    break;
                case 1:
                    s = v;
                    break;
                case 2:
                    e = v;
                    break;
                case 3:
                    c = v;
                    break;
                default:
                 break;
            }
        });
        return {type: type, url: u, data: d, success: s, error: e, complete: c};
    }
    static register(...args) {
        http.ajax(api.getArgs("/users", "POST", ...args));
    }
    static login(...args) {
        http.ajax(api.getArgs("/user_sessions", "POST", ...args));
    }
    static userInfo(...args) {
        http.ajax(api.getArgs("/users/me", "GET", ...args));
    }
    static punches(...args) {
        http.ajax(api.getArgs("/punches", "POST", ...args));
    }
    static punchesHistory(page, ...args) {
        http.ajax(api.getArgs("/punches?page=" + page, "GET", ...args));
    };
    static ranks(...args) {
        http.ajax(api.getArgs("/ranks", "GET", ...args));
    }
}