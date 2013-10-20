/**
 * Class WashingMachine
 * @extend: Product
 */
define(
    ['myclass', 'gma/market/Product'],
    function (my, Product) {
        "use strict";

        return my.Class(Product, {

            constructor: function (type, cost){
            	this.img = 'washingmachine.png';
            	this.cost = cost;
            },
        });
    }
)
;
