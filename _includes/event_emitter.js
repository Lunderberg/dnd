var EventEmitter = function() {
    this.events = {};
}

EventEmitter.prototype.on = function(signal, callback) {
    var callbacks = this.events[signal];
    if(callbacks === undefined) {
        callbacks = [];
        this.events[signal] = callbacks;
    }
    callbacks.push(callback);
}

EventEmitter.prototype.emit = function(signal) {
    var callbacks = this.events[signal];
    if(callbacks !== undefined) {
        var args = Array.prototype.slice.call(arguments,1);
        callbacks.forEach(function(callback) {
            callback.apply(callback, args);
        });
    }
}
