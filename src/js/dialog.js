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
        // this.opt = opt;

        this._popup.html(opt.innerHTML);

        if (opt.ok) {
            opt.button.push({
                id: 'ok',
                className: 'ok',
                value: opt.okValue,
                callback: opt.ok
            });
        }

        if (opt.cancel) {
            opt.button.push({
                id: 'cancel',
                className: 'cancel',
                value: opt.cancelValue,
                callback: opt.cancel
            })
        }

        // 遍历opt，和dialog原型方法同名属性作为参数传入dialog原型方法
        // 不同名属性加入dialog对象属性
        $.each(opt, function(k, v) {
            if (typeof that[k] === 'function') {
                that[k](v);
            } else {
                that[k] = v;
            }
        });

        // 触发按钮回调
        this._find('button').on('click', '[data-id]', function() {
            that._trigger($(this).data('id'));
        })

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

        /**
         * 设置弹窗标题
         * @param  {String} title 弹窗标题
         */
        title: function(title) {
            this._find('title').html(title);
            this.reset();
            return this;
        },

        /**
         * 设置弹窗内容
         * @param  {String, HTMLElement} content 弹窗内容
         */
        content: function(content) {
            this._find('content')
                .empty()
                [typeof content === 'object' ? 'append' : 'html'](content);
            this.reset();

            return this;
        },

        /**
         * 设置按钮组
         * @param  {Object} args 按钮组配置对象
         */
        button: function(args) {
            var html = '',
                that = this;
                that.callbacks = {};

            $.each(args, function(k, v) {
                v.id = v.id || v.value;
                html += '<button type="button" data-id="' + v.id + '">' + v.value + '</button>';
                that.callbacks[v.id] = v.callback;
            });
            this._find('button')[0].innerHTML += html;
        },

        /**
         * 设置弹窗宽度
         * @param  {Number|String} value 弹窗宽度
         */
        width: function(value) {
            this._find('content').width(value);
        },

        /**
         * 设置弹窗高度
         * @param  {Number|String} value 弹窗高度
         */
        height: function(value) {
            this._find('content').height(value);
        },

        /**
         * 设置关闭按钮
         * @param  {Boolean} arg 是否显示关闭按钮
         */
        close: function(arg) {
            this._find('close')
                [arg ? 'show' : 'hide']();
        },

        /**
         * 触发回调函数
         * @param  {String} id 回调函数id
         * @return {[type]}    [description]
         */
        _trigger: function(id) {
            console.log(id);
            var cb = this.callbacks[id];
            return typeof cb !== 'function' || cb.call(this) !== false ?
                this.hide().destroy() : this;
        },

        /**
         * 根据名称快速获得元素引用
         * @param  {String} role 弹窗组成部分名称
         */
        _find: function(role) {
            return this._popup.find('.sui-dialog-' + role);
        }

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
