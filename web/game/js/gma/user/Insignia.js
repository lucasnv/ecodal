/**
 * Class Market
 * 
 */
define(
    ['myclass', 'gma/Resource'],
    function (my, Resource) {
        "use strict";

        return my.Class({

            constructor: function () {
            	this.img = '';
            	this.cant = 0;
            },

            add: function(cant) {
            	this.cant += cant; 
            },

            remove: function(cant) {

                if(this.cant-cant >= 0){
                    this.cant -= cant;
                } else {
                    this.cant = 0;
                }                
            },

            setCant: function(cant){

                if( cant<0 ){
                    cant = 0;
                }

                this.cant = cant;
            },

            getCant: function(){
                return this.cant;
            },

            render: function(container){
                $(container).html(this.img);
            }
        });
    }
)
;
