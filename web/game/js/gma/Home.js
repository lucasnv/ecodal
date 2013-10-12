/**
 * Class Home
 * @Extend: Entity
 */
define(['myclass', 'gma/Entity'], function (my, Entity) {

    var Home = my.Class(Entity, {

        _vitality: 0,
        _energy: 0,
        _water: 0,
        _recycling: 0,

        constructor: function (stage) {
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