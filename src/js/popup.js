define(function(require, exports, module) {

    var $ = require('jquery');
    
    var _IE6 = !('minWidth' in $('html')[0].style);
    var _count = 0;

    function Popup() {
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

        // window layer
        node: null,

        // mask layer
        mask: null,

        // fixed positioning
        fixed: false,

        // whether popup is displayed
        present: false,

        // whether popup is removed
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
        },

        // prepare the layer
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
        }

    });

});