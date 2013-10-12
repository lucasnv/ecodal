define(['myclass', 'gma/util/Iterator'], function (my, Iterator) {
    "use strict";

    var Idea = my.Class({
        constructor: function () {
            console.log('Creando Idea');
            this.items = [];
        }
    });

    my.extendClass(Idea, Iterator);

    return Idea;
});
