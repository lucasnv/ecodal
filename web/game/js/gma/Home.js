/**
 * Class Home
 * @Extend: Entity
 */
define(['myclass', 'gma/Entity'], function (my, Entity) {

    "use strict";

    var Home = my.Class(Entity, {

        constructor: function (stage) {
            this.container = '#home_container';
            this.minLevel = 0;
            this.maxLevel = 100;
            this.damage = 0; // daño que puede hacer a los denizen
            this.vitality = 0;
            this.energy = 0;
            this.water = 0;
            this.recycling = 0;
            this.rooms = [];
            Home.Super.call(this, stage);
        },

        addRoom: function(room){
            this.rooms.push(room);
        }
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

        show: function(){
            var view = '<span class="glyphicon glyphicon-home"></span>' + this.getVitality() + '<br>';

            view += 'Agua: <span class="water_container">' + this.water + '</span><br>';
            view += 'Energía: <span class="energy_container">' + this.energy + '</span><br>';
            view += 'Reciclado: <span class="recycling_container">' + this.recycling + '</span><br>';

            $(this.container).html(view);
        }

    });

    return Home;
});