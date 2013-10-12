define(['myclass'], function (my) {
    "use strict";

    var Conscience = my.Class({
        god: null,
        timeout: null,
        constructor: function (god) {
            console.log('Creando Conscience con god:', god);

            if (!god) {
                throw new Error('No puede haber Conscience sin god');
            }

            this.god = god;
            this.think();
        },
        think: function () {
            var self = this;
            var defer = $.deferred

            this.timeout = setTimeout(function () {
                console.log('think', self);
            }, 1000);
        }
    });

    return Conscience;
});