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
                this.container = '#user_container';
                this.insignaContainer = '#insigna-container';
                this.gender = gender;
                this.insignias = { 'water':new InsigniaWater(), 'energy': new InsigniaEnergy(), 'recycling': new InsigniaRecycling() };
                //this.create();
            },

            create: function (){
                //$(this.container).html('<h3>Usuario</h3><p id="img-user">Tipo: ' + this.gender + '</p>'+ this.getInsignaContainer());
            },

            addInsigna: function(type, cant){
                switch(type){
                    case 'water': this.insignias.water.add(cant);
                        break;
                    case 'energy': this.insignias.energy.add(cant);
                        break;
                    case 'recycling': this.insignias.recycling.add(cant);
                        break;
                }
                this.updateInsigna();
            },

            //Actualizar la cantidad de insigias cuando se agregan o se quitan
            updateInsigna:function(){
                $(this.insignaContainer).html(this.getInsignaContainer());
            },

            getInsignaContainer: function(){

                return '<div id="insigna-container">'+
                       '<p id="insigna-water">Agua: ' + this.insignias.water.getCant() + '</p>' +
                       '<p id="insigna-energy">Energia: ' + this.insignias.energy.getCant() + '</p>' +
                       '<p id="insigna-recycling">Reciclado: ' + this.insignias.recycling.getCant() + '</p>' +
                       '</div>';
            },

            //Debe mostrar la imagen de la alerta
            removeInsigna: function(type, cant){
                switch(type){
                    case 'water': this.insignias.water.remove(cant);
                        break;
                    case 'energy': this.insignias.energy.remove(cant);
                        break;
                    case 'recycling': this.insignias.recycling.remove(cant);
                        break;
                }
                this.updateInsigna();
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
