/**
 * Class Product
 * 
 */
define(
    ['myclass', 'gma/Resource'],
    function (my, Resource) {
        "use strict";

        return my.Class({

            constructor: function () {
            	this.img = '';
            	this.cost = 0;//Tiene que ser un objeto
            },

            getCost: function(){
                return this.cost;
            },

            show: function(container){
                $(container).html('<img href="'+this.img+'" >');
            }
        });
    }
)
;
