/**
 * Class Home
 * @Extend: Entity
 */
define(['myclass', 'gma/Entity'], function (my, Entity) {

    "use strict";

    var Home = my.Class(Entity, {

        constructor: function (stage) {
            console.log('Home', '::', 'constructor');

            this.vitality = 0;
            this.energy = 0;
            this.water = 0;
            this.recycling = 0;
            Home.Super.call(this, stage);
        },

        addEnergy: function (energy) {
            this.energy += energy;
        },

        addWater: function (water) {
            this.water += water;
        },

        getRecycling: function (recycling) {
            this.recycling += recycling;
        },

        getVitality: function () {
            return this.energy + this.water + this.recycling;
        }

    });

    return Home;
});