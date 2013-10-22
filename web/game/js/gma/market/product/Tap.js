/**
 * Class Nightlighth
 * @extend: Product
 */
define(
    ['myclass', 'gma/market/Product'],
    function (my, Product) {
        "use strict";

        return my.Class(Product, {

            constructor: function (type, cost){
            	this.img = 'tap.png';
            	this.cost = {'water':0, 'energy':0, 'recycling':0};
            },
        });
    }
)
;
