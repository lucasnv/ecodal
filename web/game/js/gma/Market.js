/**
 * Class Market
 * FALTA RENEDERIZAR EL MARKET, utlizar las funciones de compra
 */
define(
    ['myclass', 'gma/Resource', 'gma/market/product/Nightlight', 'gma/market/product/tap', 'gma/market/product/Trash', 'gma/market/product/WashingMachine',],
    function (my, Resource) {
        "use strict";

        return my.Class({

            constructor: function () {
                this.products = ['nightlight': new Nightlight(null,null), 'tap': new Tap(null,null), 'trash-green': new Trash('green',null), 'trash-blue': new Trash('blue', null), 'trash-yellow': new Trash('yellow', null),  'washingMashine': new Trash(null, null),];
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
