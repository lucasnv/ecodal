define(['myclass'], function (my) {
    "use strict";

    return my.Class({
        constructor: function (name, params) {
            this.name = name || '';
            this.params = params || [];
        }
    });

});
