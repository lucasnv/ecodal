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
            	this.img = 'nightlight.png';
            	this.cost = cost;
            },
        });
    }
)
;
