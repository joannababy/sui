define(function(require, exports, module) {
    
    function Event() {

        this._eventCache = {};

    };

    $.extend(Event.prototype, {

        // event relavant methods
        /**
         * 获得事件缓存
         * @param  {String} 事件类型
         */
        _getEventListener: function(type) {
            var eventCache = this._eventCache;
            eventCache = this._eventCache = eventCache ? eventCache : {};
            eventCache[type] = eventCache[type] ? eventCache[type] : [];
            return eventCache[type];
        },

        /**
         * 分发事件
         * @param  {String} 事件类型
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

        /**
         * 增加事件监听函数
         * @param {String}   事件类型
         * @param {Function} cb   回调函数
         */
        addEventListener: function(type, cb) {
            var eventCache = this._eventCache;
            if (!eventCache[type]) {
                eventCache[type] = [];
            }
            eventCache[type].push(cb);
            return this;
        },

        /**
         * 移除事件监听函数
         * @param  {String}   事件类型
         * @param  {Function} cb   回调函数
         */
        removeEventListener: function(type, cb) {
            var eventCache = this._eventCache;
            for (var i = 0, len = eventCache.length; i < len; i++) {
                if (cb === eventCache[i]) {
                    eventCache.splice(i--, 1);
                }
            }
            return this;
        }

    });
    
    // 派发事件函数别名
    Event.prototype.emit = Event.prototype._dispatchEvent;

    module.exports = Event;

});