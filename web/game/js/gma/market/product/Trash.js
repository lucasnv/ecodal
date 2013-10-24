/**
 * Class Trash
 * @extend: Product
 */
define(
    ['myclass', 'gma/market/Product'],
    function (my, Product) {
        "use strict";

        var product = my.Class(Product, {

            constructor: function (type, cost){
                product.Super.call(this);
            	this.img = this.getTrash(type);
            	this.cost = {'water':0, 'energy':0, 'recycling':0};
            },

            getTrash: function(type){
                switch(type){
                    case 'green': 
                        this.img = 'trash-green.png';
                        break;
                    case 'blue':
                        this.img = 'trash-blue.png'; 
                        break;
                    case 'yellow':
                        this.img = 'trash-yellow.png';
                        break;      
                }
            }
        });

        return product;
    }
)
;
