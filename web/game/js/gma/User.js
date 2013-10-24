/**
 * Class User
 * @extended: InsigniaWater, InsigniaEnergy, InsigniaRecycling
 */
define(
    ['myclass', 'gma/Resource', 'gma/user/insignia/Water', 'gma/user/insignia/Energy', 'gma/user/insignia/Recycling'],
    function (my, Resource, InsigniaWater, InsigniaEnergy, InsigniaRecycling ) {
        "use strict";

        return my.Class({

            constructor: function (gender) {
                /* Attr*/
                this.container = '#user-container';
                this.insignaContainer = '#insigna-container';
                this.gender = gender;
                this.insignias = { 'water':new InsigniaWater(), 'energy': new InsigniaEnergy(), 'recycling': new InsigniaRecycling() };

                this.insignias.water.setCant(150);
                this.insignias.energy.setCant(150);
                this.insignias.recycling.setCant(200);
            },

            create: function (){
                this.updateInsignia();
           },

            addInsignia: function(type, cant){
                switch(type){
                    case 'water': this.insignias.water.add(cant);
                        break;
                    case 'energy': this.insignias.energy.add(cant);
                        break;
                    case 'recycling': this.insignias.recycling.add(cant);
                        break;
                }
            },

            //Actualizar la cantidad de insigias cuando se agregan o se quitan
            updateInsignia:function(){
                var me = this;
                $('.cant-insignia-water').html(me.insignias.water.getCant());
                $('.cant-insignia-energy').html(me.insignias.energy.getCant());
                $('.cant-insignia-recycling').html(me.insignias.recycling.getCant());
            },

            //Debe mostrar la imagen de la alerta
            removeInsignia: function(type, cant){
                switch(type){
                    case 'water': this.insignias.water.remove(cant);
                        break;
                    case 'energy': this.insignias.energy.remove(cant);
                        break;
                    case 'recycling': this.insignias.recycling.remove(cant);
                        break;
                }
            },

            showAlert: function(type){
                switch(type){
                    case 'water': console.log('alerta agua');
                        break;
                    case 'energy': console.log('alerta energia');
                        break;
                    case 'recycling': console.log('alerta reciclado');
                        break;
                }
            },

            canPay: function(cost){
                var can = false;

                if( (cost.water <= this.insignias.water.getCant()) && 
                    (cost.energy <= this.insignias.energy.getCant()) && 
                    (cost.recycling <= this.insignias.recycling.getCant()) ){
                    can = true;
                }

                return can;
            },

            toString: function(){
                return 'User';
            }

        });
    }
)
;
