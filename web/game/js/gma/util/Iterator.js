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

    return function () {
        this.index = 0;
        this.items = [];
        this.first = function () {
            this.reset();
            return this.next();
        };
        this.next = function () {
            return this.items[this.index++];
        };
        this.hasNext = function () {
            return this.index <= this.items.length;
        };
        this.reset = function () {
            this.index = 0;
        };
        this.each = function (callback) {
            for (var item = this.first(); this.hasNext(); item = this.next()) {
                callback(item);
            }
        };
        this.addItem = function (item) {
            this.items.push(item);
        };
        this.length = function () {
            return this.items.length;
        };
    }
});
