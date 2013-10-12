define(['myclass'], function (my) {
    "use strict";

    return my.Class({
        container: null,
        parent: null,
        children: [],
        constructor: function (container) {
            console.log('Creando Entity con container:', container);
            this.container = container;
        },
        addChild: function (child) {
            child.parent = this;
            this.children.push(child);
        }
    });
});
