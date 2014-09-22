define(function(require, exports, module) {

    // jquery
    var $ = require('jquery');

    // init time
    var initTime = new Date() - 0;

    // dialog count
    var count = 0;

    // default options
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

    function Dialog(options) {
        var that = this;

        var opt = options || {};
        opt = $.extend(true, {}, defaultOptions, opt);

        var dialogId = opt.dialogId = initTime + count;
        opt.def = defaultOptions;
        this.opt = opt;

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

        this._popup = $('<div />').html(opt.innerHTML)
            .css({
                'display': 'none',
                'position': 'absolute'
            })
            .appendTo('body');

        this._mask = $('<div />')
            .css({
                'display': 'none',
                'position': 'fiexed',
                'top': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'overflow': 'hidden'
            });

        this._popup.find('.sui-dialog-close')
            .css({
                'display': this.opt.close === false ? 'none' : ''
            })
            .on('click', function(event) {
                that.close().remove();
            });
    }

    Dialog.prototype = {

        // popup relavant methods
        show: function() {
            var that = this,
                popup = this._popup,
                mask = this._mask;

            this.center();
            popup.css({
                'zIndex': ++Dialog.zIndex
            }).show();

            return this;

        },

        center: function() {
            var popup = this._popup,
                $window = $(window),
                $document = $(document),
                // position: fixed;时要加的偏移量
                fixed = this.fixed,
                dl = fixed ? 0 : $document.scrollLeft(),
                dt = fixed ? 0 : $document.scrollTop(),
                ww = $window.width(),
                wh = $window.height(),
                ow = popup.width(),
                oh = popup.height(),
                left = (ww - ow) / 2 + dl,
                top = (wh - oh) * 382 / 1000 + dt, // 黄金比例
                style = popup[0].style;

            style.left = Math.max(parseInt(left), dl) + 'px';
            style.top = Math.max(parseInt(top), dt) + 'px';
        },

        // event relavant methods
        /**
         * get event cache
         * @param  {String} type event type
         */
        _getEventListener: function(type) {
            var eventCache = this._eventCache;
            eventCache = this._eventCache = eventCache ? eventCache : {};
            eventCache[type] = eventCache[type] ? eventCache[type] : [];
            return eventCache[type];
        },

        /**
         * dispatch events
         * @param  {String} type event type
         */
        _dispatchEvent: function(type) {
            var eventCache = this._eventCache;
            if (this['on' + type]) {
                this['on' + type]();
            }
            for (var i = 0, len = eventCache.length; i < len; i++) {
                eventCache[i].call(this);
            }
        },

        // trigger button callback
        _trigger: function(id) {

        },

        /**
         * add event listener
         * @param {String}   type event type
         * @param {Function} cb   callback
         */
        addEventListener: function(type, cb) {
            var eventCache = this.opt.eventCache;
            if (!eventCache[type]) {
                eventCache[type] = [];
            }
            eventCache[type].push(cb);
            return this;
        },

        /**
         * remove event listener
         * @param  {String}   type event type
         * @param  {Function} cb   callback
         */
        removeEventListener: function(type, cb) {
            var eventCache = this.opt.eventCache;
            for (var i = 0, len = eventCache.length; i < len; i++) {
                if (cb === eventCache[i]) {
                    eventCache.splice(i--, 1);
                }
            }
            return this;
        }

    };

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