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
                this.cant -= cant;
            },

            getCant: function(){
                return this.cant;
            },

            show: function(){
                
            }
        });
    }
)
;
