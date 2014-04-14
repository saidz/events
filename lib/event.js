module.exports = {
    _isArray: function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    on: function (type, fn, context) {
        var events = this.events = this.events || {};
        if (type in events && this._isArray(events[type])) {
            events[type].push({
                handler: fn,
                context: context
            });
        } else {
            events[type] = [{
                handler: fn,
                context: context
            }];
        }
    },
    off: function (type, fn, context) {
        var events = this.events;
        if (typeof events === 'object') {
            if (type in events) {
                if (!fn && !context) {
                    delete events[type];
                } else {
                    var handlers = events[type];
                    for (var i = 0; i < handlers.length; i++) {
                        if (handlers[i].handler === fn && handlers[i].context === context) {
                            handlers.splice(i, 1);
                        }
                    }
                }
            }
        }
    },
    emit: function (type, e) {
        var events = this.events;
        if (typeof events === 'object' && type in events) {
            var handlers = events[type];
            for (var i = 0; i < handlers.length; i++) {
                handlers[i].handler.call(context, e);
            }
        }
    },
    /**
     * 清除对象上的所有注册事件
     * @param  {Function} filter 过滤器，用来过滤一些清理的事件的类型
     */
    clear: function (filter) {
        if (filter instanceof Function) {
            filter(this.events);
        } else {
            this.events = {};
        }
    }
}