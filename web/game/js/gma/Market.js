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
                this.products = []; colocar producto
            },

            buy: function(user, product){
                if( user.canPay(product.getCost()) ){
                    
                    _.each(product.getCost(),function(value, key){
                        user.removeInsignia(key, value);
                    });

                    user.updateInsignia();
                    return product;
                } else {
                    return false;
                }
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

            render: function(container){
                //Mostrar el market
            }


        });
    }
)
;
