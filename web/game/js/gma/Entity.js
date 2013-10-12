define(['myclass'], function (my) {
    "use strict";

    return my.Class({
        stage: null,
        parent: null,
        body: null,
        children: [],
        constructor: function (stage) {
            console.log('Entity', '::', 'constructor', 'stage:', stage);
            this.stage = stage;
        },
        addChild: function (child) {
            child.parent = this;
            child.embody();
            this.children.push(child);
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
