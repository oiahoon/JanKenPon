import {awu} from "../../aoowu/awu.js"
let common = new class Common
{
    constructor() {
        this.user = {token: "", info: ""};
    }
    render(html, tag) {
        tag = tag ? tag : "body";
        awu.View(html, "tag=" + tag);
    }
    ajax(path, ...args) {
        let [data, onSuccess, onError, method] = [null, null, null, null];
        args.forEach(function (v, i) {
            switch (i) {
                case 0:
                    if (typeof v === "object") {
                        data = v;
                    } else if (typeof v === "function") {
                        onSuccess = v;
                    }
                    break;
                case 1:
                    if (typeof args[i - 1] === "object") {
                        onSuccess = v;
                    } else if (typeof args[i - 1] === "function") {
                        onError = v;
                    }
                    break;
                case 2:
                    onError = v;
            }
        });
        if (data !== null) {
            method = "POST";
        }
        awu.Ajax({url: path, type: method, data: data, error: onError, success: onSuccess,});
    }
    isLogin() {
        let tk = sessionStorage.getItem("token");
        let re = true;
        if (!tk || !this.user.token || tk !== this.user.token) {
            re =  false;
        }
        return re;
    }
};
export {awu, common}