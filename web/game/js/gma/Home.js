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
            this.container = '#home_container';
            this.timeToDamage = 5000;
            this.timeToLife = 10000;
            this.minLevel = 0;
            this.maxLevel = 300;

            //Danio o vida que se pueden hacer a los denizen
            this.damageLevel = 0;
            this.lifeLevel = 0;

            //Vida por tipo de energia
            this.giveLifeEnergy =1;
            this.giveLifeWater = 1;
            this.giveLifeRecycling = 1;

            //Valores iniciales de vida
            this.vitality = 0;
            this.energy = 200;
            this.water = 200;
            this.recycling = 200;

            this.rooms = [];
            Home.Super.call(this, stage);
        },

        addRooms: function(rooms){
            var me = this;

            if(_.isArray(rooms)){
                _.each(rooms, function(value, key){
                    me.rooms.push(value);
                })
            } else {
                this.rooms.push(rooms);
            }
        },

        addDamageLevel: function(damage){
            this.damageLevel += damage;
        },

        removeDamage: function(damage){
            this.damageLevel -= damage;
        },

        addLifeLevel: function(life){
            this.lifeLevel += life;
        },

        removeLifeLevel: function(life){
            this.lifeLevel -= life;
        },

        setVitality: function(vitality) {
            $this.vitality = vitality;
        },

        setEnergy: function(energy) {
            $this.energy = energy;
        },

        setWater: function(water) {
            $this.water = water;
        },

        setRecycling: function(recycling) {
            $this.recycling = recycling;
        },

        addEnergy: function (energy) {
            this.energy += energy;
        },

        addWater: function (water) {
            this.water += water;
        },

        addRecycling: function(recycling) {
            this.recycling += recycling;
        },

        removeEnergy: function(energy){
            this.energy -= energy;
        },

        removeWater: function(water){
            this.water -= water;
        },

        removeRecycling: function(recycling){
            this.recycling -= recycling;
        },

        getRecycling: function (recycling) {
            this.recycling += recycling;
        },

        getVitality: function () {
            return this.energy + this.water + this.recycling;
        },

        removePower: function( water, energy, recycling){
            if(water){
                console.log('remove water');
                if(this.minLevel <= this.water - water){
                    this.removeWater(water);
                }
            }

            if(energy){
                if(this.minLevel <= this.energy - energy){
                    this.removeEnergy(energy);
                }
            }

            if(recycling){
                if(this.minLevel <= this.recycling - recycling){
                    this.removeRecycling(recycling);
                }
            }

            this.show();
        },

        addPower: function( water, energy, recycling){
            if(water){
                if(this.maxLevel >= this.water + water){
                    this.addWater(water);
                }
            }

            if(energy){
                if(this.maxLevel >= this.energy + energy){
                    this.addEnergy(energy);
                }
            }

            if(recycling){
                if(this.maxLevel >= this.recycling + recycling){
                    this.addRecycling(recycling);
                }
            }

            this.show();
        },

        damage: function(){
            var me = this;
            var damageEnergy = 0;
            var damageWater = 0;
            var damageRecycling = 0;

            _.each(this.rooms, function(room, key){
                damageEnergy += room.power.energy;
                damageWater += room.power.water;
                damageRecycling += room.power.recycling;
            });


            setTimeout( function(){
                me.removePower(damageWater, damageEnergy, damageRecycling);
                me.damage();
            },me.timeToDamage);
        },

        life: function(){
            var me = this;
            var lifeEnergy = 0;
            var lifeWater = 0;
            var lifeRecycling = 0;
            var damageEnergy = 0;
            var damageWater = 0;
            var damageRecycling = 0;

            _.each(this.rooms, function(room, key){
                damageEnergy += room.power.energy;
                damageWater += room.power.water;
                damageRecycling += room.power.recycling;
            });

            if(damageEnergy == 0){
                lifeEnergy = this.giveLifeEnergy;
            }  

            if(damageWater == 0 ){
                lifeWater = this.giveLifeWater;
            }

            if(damageRecycling == 0 ){
                lifeRecycling = this.giveLifeRecycling;
            }

            setTimeout( function(){
                me.addPower(lifeWater, lifeEnergy, lifeRecycling);
                me.life();
            },me.timeToLife);
        },

        show: function(){
            var view = '<span class="glyphicon glyphicon-home"></span>' + this.getVitality() + '<br>';

            view += 'Agua: <span class="water_container">' + this.water + '</span><br>';
            view += 'Energía: <span class="energy_container">' + this.energy + '</span><br>';
            view += 'Reciclado: <span class="recycling_container">' + this.recycling + '</span><br>';

            $(this.container).html(view);
        },

        init: function(){
            this.show();
            this.damage();
            this.life();
        }

    });

    return Home;
});