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
                if( user.canPay(product.getCost()) ){
                    //Descontar insignias al usuario
                    //actualizar insignias
                    user.insignias.
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
