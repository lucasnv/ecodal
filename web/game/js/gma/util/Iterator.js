/**
 // using for loop

 for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
    log.add(item);
 }

 log.add("");

 // using Iterator's each method

 iter.each(function(item) {
    log.add(item);
 });
 */
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
