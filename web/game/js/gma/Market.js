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
                this.products = [];
            },

            buy: function(user, product){

            },

            addProduct: function(product){
                if(_.isArray(product)){
                    _.each(product, function(value, key){
                        this.products.push(value);
                    });
                } else {
                    this.products.push(product);
                }                
            },


        });
    }
)
;
