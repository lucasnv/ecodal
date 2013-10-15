/**
 * Class Power
 * @extend: Entity
 */
define(['myclass', 'gma/Entity'], function (my, Entity) {

    "use strict";
    
    var Power = my.Class(Entity, {

        constructor: function () {
            console.log('create power');
            this.energy = 0;
            this.water = 0;
            this.recycling = 0;
        }

    });

    return Power;
});