import {awu} from "../../aoowu/awu.js"
let common = new class Common
{
    constructor() {
        this.user = {token: "", info: ""};
    }
    render(html, call) {
        $("body").html(html);
        typeof call === "function" && call();
    }
    isLogin() {
        let tk = sessionStorage.getItem("token");
        let re = true;
        if (!tk || !this.user.token || tk !== this.user.token) {
            re =  false;
        }
        return re;
    }
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
        modal.innerHTML = `<div class="modal-dialog" role="document">    <div class="modal-content">        <div class="modal-header">            <h5 class="modal-title">${title}</h5>            <button type="button" class="close" data-dismiss="modal" aria-label="Close">                <span aria-hidden="true">&times;</span>            </button>        </div>        <div class="modal-body">            <p>${content}</p>        </div>        <div class="modal-footer">${BtnHTML}</div>    </div></div>`;
        modal.className = "modal fade";
        $(modal).attr({"tabindex": -1, "role": "dialog"});
        $("body").append(modal);
        if (type !== 1 && typeof confirm === "function") {
            $("#" + primaryID).click(function () {
                confirm();
            });
        }
        $(modal).on("hidden.bs.modal", function (e) {
            (typeof cancel === "function" && cancel()); $(modal).remove();
        });
        $(modal).modal("show");
        return {remove: function () {
            $(modal).modal("hide");
        }}
    }
};
export {awu, common}