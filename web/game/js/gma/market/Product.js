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
            	this.cost = {'water':0, 'energy':0, 'recycling':0};
            },

            getCost: function(){
                return this.cost;
            },

            render: function(container){
                $(container).html('<img href="'+this.img+'" >');
            }
        });
    }
)
;
