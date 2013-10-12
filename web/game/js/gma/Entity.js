define(['myclass'], function (my) {
    "use strict";

    return my.Class({
        container: null,
        constructor: function (container) {
            console.log('Creando Entity con container:', container);
            this.container = container;
        }
    });
});
