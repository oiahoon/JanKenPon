/**
 * Created by Hodge.Yuan@hotmail.com on 2017/11/3 0003.
 */
import {awu} from "../../aoowu/awu.js"
import {api} from "../service/api.js";

/**
 * user info
 * @type {user}
 */
let user = new class user
{
    constructor() {
        this.destroy();
    }

    set(data) {
        this.id = data.id;
        this.win_rate = data.win_rate;
        this.username = data.username;
        this.user_score = data.user_score;
        this.total_score = data.total_score;
        this.last_punch_at = data.last_punch_at;
    }

    destroy() {
        this.id = null;
        this.win_rate = 0;
        this.username = null;
        this.user_score = {};
        this.total_score = null;
        this.last_punch_at = null;
    }
};

/**
 * public functions
 * @type {Common}
 */
let common = new class Common
{
    /**
     * @param html
     * @param call
     */
    render(html, call) {
        $("body").html(html);

        typeof call === "function" && call();
    }

    /**
     * 提示框
     * @param param
     * @returns {{remove: remove}}
     */
    dialog(param) {
        let type    = param.type ? param.type : 1;
        let title   = param.title ? param.title : "提示";
        let content = param.content ? param.content : "";
        let cfBtnText = param.cfBtnText ? param.cfBtnText : "确认";
        let ceBtnText = param.ceBtnText ? param.ceBtnText : "知道了";

        let cancel  = param.cancel ? param.cancel : null;
        let confirm = param.confirm ? param.confirm : null;

        let BtnHTML   = "";
        let primaryID = (new Date()).getTime();
        let hideBtnHtml = '<button type="button" style="opacity: 0"></button>';
        let confBtnHtml = `<button id="${primaryID}" type="button" class="btn btn-primary">${cfBtnText}</button>`;
        let caneBtnHtml = `<button type="button" class="btn btn-secondary " data-dismiss="modal">${ceBtnText}</button>`;

        switch (type) {
            case 1:
                BtnHTML = `${hideBtnHtml}${caneBtnHtml}`;
                break;
            case 2:
                BtnHTML = `${hideBtnHtml}${confBtnHtml}`;
                break;
            case 3:
                BtnHTML = `${caneBtnHtml}${confBtnHtml}`;
                break;
            default:
        }

        let modal = document.createElement("div");
        modal.innerHTML = `{dialog.html}`;
        modal.className = "modal fade";

        $(modal).attr({"tabindex": -1, "role": "dialog"});
        $("body").append(modal);

        // 确定回调
        if (type !== 1 && typeof confirm === "function") {
            $("#" + primaryID).click(function () {
                confirm();
            });
        }

        // 关闭回调
        $(modal).on("hidden.bs.modal", function (e) {
            (typeof cancel === "function" && cancel()); $(modal).remove();
        });

        $(modal).modal("show");

        return {remove: function () {
            $(modal).modal("hide");
        }}
    }

};

export {awu, common, api, user}