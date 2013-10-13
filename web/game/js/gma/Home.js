/**
 * Class Home
 * @Extend: Entity
 */
define(['myclass', 'gma/Entity'], function (my, Entity) {

    "use strict";

    var Home = my.Class(Entity, {

        constructor: function (stage) {
            this.vitality = 0;
            this.energy = 0;
            this.water = 0;
            this.recycling = 0;
            Home.Super.call(this, stage);
            console.log('Home', '::', 'constructor');
        },

        addEnergy: function (energy) {
            this._energy += energy;
        },

        addWater: function (water) {
            this._water += water;
        },

        getRecycling: function (recycling) {
            this._recycling += recycling;
        },

        getVitality: function () {
            return this._energy + this._water + this._recycling;
        }

    });

    return Home;
});