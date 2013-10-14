define(['myclass'], 
    function (my) {
    "use strict";

    return my.Class({

        constructor: function (stage) {
            /* Attr*/
            this.parent = null;
            this.body = null;
            this.children = [];
           /* this.x = 0;
            this.y = 0;
            this.z = 0;*/
            this.stage = stage;
        },

      /*  setPosition: function(x, y ,z){
            this.x = x;
            this.y = y;
            this.z = z;
        },*/

        addChild: function (child) {
            child.parent = this;
            child.embody();
            this.children.push(child);
        },

        delParent: function(child){
            child.parent = null;
        },

        //NO LA ENTIENDO
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
