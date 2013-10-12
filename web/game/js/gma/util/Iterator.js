define([], function () {
    "use strict";

    return {
        index: 0,
        items: [],
        first: function () {
            this.reset();
            return this.next();
        },
        next: function () {
            return this.items[this.index++];
        },
        hasNext: function () {
            return this.index <= this.items.length;
        },
        reset: function () {
            this.index = 0;
        },
        each: function (callback) {
            for (var item = this.first(); this.hasNext(); item = this.next()) {
                callback(item);
            }
        },
        addItem: function (item) {
            this.items.push(item);
        },
        length: function () {
            return this.items.length;
        }
    }
});
