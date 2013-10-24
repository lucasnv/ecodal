/**
 * Class Home
 * @Extend: Entity
 */

    //Falata implementar el danio a los denizen con damageLevel y lifeLevel
    //para eso se puede recorrer los childs hasta encontrar del tipo denizen
    //Falta implmenta que sucedera cuando lleguen a los topes
    //Falta implementar visual de la casa

define(['myclass', 'gma/Entity'], function (my, Entity) {

    "use strict";

    var Home = my.Class(Entity, {

        constructor: function (stage) {
            this.container = '#home_container_status';
            this.timeToDamage = 5000;
            this.timeToLife = 11000;
            this.timeToDamageDenizen = 60000;
            this.minLevel = 0;
            this.maxLevel = 300;

            //Daño o vida que se pueden hacer a los denizen
            this.lifeDenizen = 0;

            //Vida por tipo de energia
            this.giveLifeEnergy = 1;
            this.giveLifeWater = 1;
            this.giveLifeRecycling = 1;

            //Valores iniciales de vida
            this.vitality = 0;
            this.energy = 150;
            this.water = 150;
            this.recycling = 150;

            this.rooms = [];
            this.denizens = [];
            Home.Super.call(this, stage);
        },

        addRooms: function (rooms) {
            var me = this;

            if (_.isArray(rooms)) {
                _.each(rooms, function (value, key) {
                    me.rooms.push(value);
                })
            } else {
                this.rooms.push(rooms);
            }
        },

        addDenizens: function (denizens) {
            var me = this;

            if (_.isArray(denizens)) {
                _.each(denizens, function (value, key) {
                    me.denizens.push(value);
                })
            } else {
                this.rooms.push(denizens);
            }
        },

        getMaxHomeVitality: function () {
            //Colocar vitalidad como un objeto esto es horrible
            return 3 * this.maxLevel;
        },

        getDamageDenizen: function () {

            var damage = Math.round((this.getMaxHomeVitality() - this.getVitality()) / 10);

            while (damage > 10) {
                damage = Math.round(damage / 10);
            }

            return damage;
        },

        damageDenizen: function () {
            setTimeout(function () {
                _.each(this.denizens, function (denizen, key) {
                    denizen.vitality -= this.getDamageDenizen();
                });
            }, this.timeToDamageDenizen);
        },

        lifeDenizen: function (life) {
            _.each(this.denizens, function (denizen, key) {
                denizen.vitality += life;
            });
        },

        setVitality: function (vitality) {
            this.vitality = vitality;
        },

        setEnergy: function (energy) {
            this.energy = energy;
        },

        setWater: function (water) {
            this.water = water;
        },

        setRecycling: function (recycling) {
            this.recycling = recycling;
        },

        addLifeLevel: function (life) {
            this.lifeLevel += life;
        },

        addEnergy: function (energy) {
            this.energy += energy;
        },

        addWater: function (water) {
            this.water += water;
        },

        addRecycling: function (recycling) {
            this.recycling += recycling;
        },

        addPower: function (water, energy, recycling) {
            if (water) {
                if (this.maxLevel >= this.water + water) {
                    this.addWater(water);
                } else {
                    this.addWater(this.maxLevel - this.water);
                }
            }

            if (energy) {
                if (this.maxLevel >= this.energy + energy) {
                    this.addEnergy(energy);
                } else {
                    this.addEnergy(this.maxLevel - this.energy);
                }
            }

            if (recycling) {
                if (this.maxLevel >= this.recycling + recycling) {
                    this.addRecycling(recycling);
                } else {
                    this.addRecycling(this.maxLevel - this.recycling);
                }
            }

            this.show();
        },

        removeEnergy: function (energy) {
            this.energy -= energy;
        },

        removeWater: function (water) {
            this.water -= water;
        },

        removeRecycling: function (recycling) {
            this.recycling -= recycling;
        },

        removeLifeLevel: function (life) {
            this.lifeLevel -= life;
        },

        removePower: function (water, energy, recycling) {
            if (water) {
                if (this.minLevel <= this.water - water) {
                    this.removeWater(water);
                } else {
                    this.removeWater(this.water);
                }
            }

            if (energy) {
                if (this.minLevel <= this.energy - energy) {
                    this.removeEnergy(energy);
                } else {
                    this.removeEnergy(this.energy);
                }
            }

            if (recycling) {
                if (this.minLevel <= this.recycling - recycling) {
                    this.removeRecycling(recycling);
                } else {
                    this.removeRecycling(this.recycling);
                }
            }

            this.show();
        },

        calculateVitality: function(vitality){
            return (vitality*100)/this.maxLevel;
        },

        getEnergy: function(){
            return this.calculateVitality(this.energy);
        },

        getWater: function(){
            return this.calculateVitality(this.water);
        },
        
        getRecycling: function () {
            return this.calculateVitality(this.recycling);
        },

        getVitality: function () {
            return ((this.energy + this.water + this.recycling)*100)/this.getMaxHomeVitality();
        },

        damage: function () {
            var me = this;
            var damageEnergy = 0;
            var damageWater = 0;
            var damageRecycling = 0;

            _.each(this.rooms, function (room, key) {
                damageEnergy += room.power.energy;
                damageWater += room.power.water;
                damageRecycling += room.power.recycling;
            });


            setTimeout(function () {
                me.removePower(damageWater, damageEnergy, damageRecycling);
                me.damage();
            }, me.timeToDamage);
        },

        life: function () {
            var me = this;
            var lifeEnergy = 0;
            var lifeWater = 0;
            var lifeRecycling = 0;
            var damageEnergy = 0;
            var damageWater = 0;
            var damageRecycling = 0;

            _.each(this.rooms, function (room, key) {
                damageEnergy += room.power.energy;
                damageWater += room.power.water;
                damageRecycling += room.power.recycling;
            });

            if (damageEnergy == 0) {
                lifeEnergy = this.giveLifeEnergy;
            }

            if (damageWater == 0) {
                lifeWater = this.giveLifeWater;
            }

            if (damageRecycling == 0) {
                lifeRecycling = this.giveLifeRecycling;
            }

            setTimeout(function () {
                me.addPower(lifeWater, lifeEnergy, lifeRecycling);
                me.life();
            }, me.timeToLife);
        },

        show: function () {
            var me = this;
            $('#home-vitality').css({width: me.getVitality()+'%'});
            $('#home-water-vitality').css({width: me.getWater() + '%'});
            $('#home-energy-vitality').css({width: me.getEnergy() + '%'});
            $('#home-recyling-vitality').css({width: me.getRecycling() + '%'});
        },

        init: function () {
            this.show();
            this.damage();
            this.life();
            this.damageDenizen();
        }
    });

    return Home;
});