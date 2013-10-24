/**
 * Class WashingMachine
 * @extend: Product
 */
define(
    ['myclass', 'gma/market/Product'],
    function (my, Product) {
        "use strict";

        var product = my.Class(Product, {

            constructor: function (type, cost){
                product.Super.call(this);
            	this.img = 'washingmachine.png';
            	this.cost = {'water':0, 'energy':0, 'recycling':0};
            },
        });

        return product;
    }
)
;
