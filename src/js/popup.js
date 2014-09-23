define(function(require, exports, module) {

    var $ = require('jquery');
    var Event = require('./event');
    
    var _IE6 = !('minWidth' in $('html')[0].style);
    var _count = 0;

    // 继承Event原型方法
    var event = function() {};
    event.prototype = Event.prototype;
    Popup.prototype = new event();

    function Popup() {
        // 继承Event类自有属性
        $.extend(this, new Event());

        this._popup = $('<div />')
            .css({
                'display': 'none',
                'position': 'absolute'
            })
            .html(this.innerHTML)
            .appendTo('body');

        this._mask = $('<div />');

        _count++;
    }

    $.extend(Popup.prototype, {

        // 弹层
        node: null,

        // 遮罩层
        mask: null,

        // 遮罩颜色
        maskColor: '#000',

        // 遮罩透明度
        maskOpacity: '0.6',

        // 是否fixed定位
        fixed: false,

        // 是否显示弹层
        present: false,

        // 是否remove弹层
        removed: false,

        // classname
        classname: 'sui-popup',

        // popup methods
        show: function() {
            if (this.removed) {
                return this;
            }
            var that = this,
                popup = this._popup;

            this.present = true;
            this.prepare();

            popup
                .css('position', this.fixed ? 'fixed' : 'absolute')
                .show();

            this.reset();
            this._dispatchEvent('show');
            return this;
        },

        // 初始化弹层
        prepare: function() {
            var that = this;
            var popup = this._popup;

            if (!this._ready) {
                popup.addClass(this.classname);
                if (this.modal) {
                    this._mask();
                }
                if (!popup.html()) {
                    popup.html(this.innerHTML);
                }
                if (!_IE6) {
                    $(window).on('resize', function() {
                        that.reset();
                    });
                }
                this._ready = true;
            }
        },

        // 弹层定位
        reset: function() {
            var popup = this._popup,
                $window = $(window),
                $document = $(document),
                fixed = this.fixed,
                dl = fixed ? 0 : $document.scrollLeft(),
                dt = fixed ? 0 : $document.scrollTop(),
                ww = $window.width(),
                wh = $window.height(),
                ow = popup.width(),
                oh = popup.height(),
                left = (ww - ow) / 2 + dl,
                top = (wh - oh) * 382 / 1000 + dt,
                style = popup[0].style;

            style.left = Math.max(parseInt(left), dl) + 'px';
            style.top = Math.max(parseInt(top), dt) + 'px';

            return this;
        },

        // 设置遮罩层
        _setMask: function() {
            var that = this,
                popup = this._popup,
                mask = this._mask,
                $window = $(window);

            Popup.zIndex += 2;
            this._top();

            var maskCSS = {
                position: _IE6 ? 'absolute' : 'fixed',
                left: 0,
                top: 0,
                width: _IE6 ? $window.width() : '100%',
                height: _IE6 ? $window.height() : '100%',
                overflow: 'hidden',
                opacity: 0
            };
        },

        // 触发按钮回调
        _trigger: function(id) {

        }

    });

    Popup.zIndex = 8000;

    Popup.current = null;

    module.exports = Popup;

});