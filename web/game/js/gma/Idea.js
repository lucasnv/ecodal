define(['myclass', 'gma/util/Iterator'], function (my, Iterator) {
    "use strict";

    var Idea = my.Class({
        constructor: function () {
            console.log('Idea', '::', 'constructor');
            this.index = 0;
            this.items = [];
        }
    });

    my.extendClass(Idea, Iterator);

    return Idea;
});
