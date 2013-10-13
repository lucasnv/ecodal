define(['myclass'], 
    function (my) {
    "use strict";

    return my.Class({

        constructor: function (stage) {
            /* Attr*/
            this.stage = null;
            this.parent = null;
            this.body = null;
            this.children = [];
            this.stage = stage;
        },

        addChild: function (child) {
            child.parent = this;
            child.embody();
            this.children.push(child);
        },

        embody: function () {
            if (this.stage && this.body) {
                this.stage.addChild(this.body);
                this.render();
            }
        },

        render: function () {
            if (this.stage && this.body) {
                this.stage.update();
            }
        }
    });
});
