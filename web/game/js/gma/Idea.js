define(['myclass', 'gma/util/Iterator'], function (my, Iterator) {
    "use strict";

    var Idea = my.Class({
        constructor: function (actions) {

            this.index = 0;
            
            if (_.isArray(actions)){
                this.items = actions;
            } else {
                this.items = [];
            }                
        }

    });

    my.extendClass(Idea, new Iterator());

    return Idea;
});
