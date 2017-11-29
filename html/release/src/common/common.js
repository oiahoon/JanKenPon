import {api} from "../service/api.js";
let JKP = new class {
    constructor() {
        this.classMap = {};
    }
    Page(cls) {
        if (typeof cls === 'function') {
            if (!this.classMap.hasOwnProperty(cls.name)) {
                this.classMap[cls.name] = new cls;
            }
            this.classMap[cls.name].__constructor();
        } else {
            if (!this.classMap.hasOwnProperty(cls)) {
                throw "JKP.Page: class " + cls + " undefined";
            }
            this.classMap[cls].__constructor();
        }
    }
};
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
let common = new class Common
{
    render(html, call) {
        let wrapper =  document.getElementById('jkp_container');
        if (wrapper) {
            wrapper.innerHTML = html;
            typeof call === "function" && call();
        }
    }
    header(bln) {
        if (bln) {
            $("#navbar").html(`<ul class="navbar-nav">    <li class="nav-item">        <a data-target="jkp" class="nav-page nav-link" href="javascript:;">            <i class="now-ui-icons tech_controller-modern"></i>            <p>出拳吧</p>        </a>    </li>    <li class="nav-item">        <a data-target="rank" class="nav-page nav-link" href="javascript:;">            <i class="now-ui-icons sport_trophy"></i>            <p>排行榜</p>        </a>    </li>    <li class="nav-item">        <a data-target="histories" class="nav-page nav-link" href="javascript:;">            <i class="now-ui-icons design_bullet-list-67"></i>            <p>出拳记录</p>        </a>    </li></ul>`);
        } else {
            $("#navbar").html('');
        }
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
export {JKP, common, api, user}