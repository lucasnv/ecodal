define(['myclass'], function (my) {
    "use strict";

    return my.Class({

        constructor: function (stage) {
            this.stage: null,
            this.parent: null,
            this.body: null,
            this.children: [],
            console.log('Entity', '::', 'constructor', 'stage:', stage);
            this.stage = stage;
        },
        addChild: function (child) {
            child.parent = this;
            child.embody();
            this.children.push(child);
            console.log('children', this.children);
        },
        embody: function () {
            console.log('Entity', '::', 'embody');
            if (this.stage && this.body) {
                this.stage.addChild(this.body);
                this.render();
            }
        },
        render: function () {
            console.log('Entity', '::', 'render');
            if (this.stage && this.body) {
                this.stage.update();
            }
        }
    });
});
