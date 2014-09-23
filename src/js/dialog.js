define(function(require, exports, module) {

    var $ = require('jquery');
    var Popup = require('./popup');

    // 初始化事件，用作给实例加id
    var initTime = new Date() - 0;

    // 弹层数
    var count = 0;

    // 默认配置
    var defaultOptions = {

        content: '',
        title: '',
        okValue: '确定',
        cancelValue: '取消',
        close: true,
        button: [],
        width: '',
        height: '',
        fixed: false,
        quickClose: false,
        modal: false,

        // HTML structure
        innerHTML:
            '<div class="sui-dialog">'
            +   '<table class="sui-dialog-main">'
            +       '<tr>'
            +           '<td class="sui-dialog-header">'
            +               '<button class="sui-dialog-close">&#215;</button>'
            +               '<div class="sui-dialog-title"></div>'
            +           '</td>'
            +       '</tr>'
            +       '<tr>'
            +           '<td class="sui-dialog-body">'
            +               '<div class="sui-dialog-content"></div>'
            +           '</td>'
            +       '</tr>'
            +       '<tr>'
            +           '<td class="sui-dialog-footer">'
            +               '<div class="sui-dialog-button">'
            +               '</div>'
            +           '</td>'
            +       '</tr>'
            +   '</table>'
            +'</div>'

    };

    // 继承Popup原型方法
    var popup = function() {};
    popup.prototype = Popup.prototype;
    Dialog.prototype = new popup();
    
    function Dialog(options) {
        var that = this;

        // 继承Popup类自有属性
        $.extend(this, new Popup());

        var opt = options || {};
        opt = $.extend(true, {}, defaultOptions, opt);

        var dialogId = opt.dialogId = initTime + count;
        opt.def = defaultOptions;
        this.opt = opt;

        this._popup.html(this.opt.innerHTML);

        if (this.opt.ok) {
            this.opt.button.push({
                id: 'ok',
                value: this.opt.okValue,
                callback: this.opt.ok
            });
        }

        if (this.opt.cancel) {
            this.opt.button.push({
                id: 'cancel',
                value: this.opt.cancelValue,
                callback: this.opt.cancel
            })
        }

        // this._mask = $('<div />')
        //     .css({
        //         'display': 'none',
        //         'position': 'fiexed',
        //         'top': 0,
        //         'left': 0,
        //         'width': '100%',
        //         'height': '100%',
        //         'overflow': 'hidden'
        //     });

        // this._popup.find('.sui-dialog-close')
        //     .css({
        //         'display': this.opt.close === false ? 'none' : ''
        //     })
        //     .on('click', function(event) {
        //         that.close().remove();
        //     });
    }

    $.extend(Dialog.prototype, {

    });

    // find dialog object
    Dialog.find = function(id) {
        return Dialog.group[id];
    }

    // dialog group
    Dialog.group = {};

    // z-index setting
    Dialog.zIndex = 8000;

    module.exports = Dialog;

});