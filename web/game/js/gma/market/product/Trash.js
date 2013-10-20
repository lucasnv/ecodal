/**
 * Class Trash
 * @extend: Product
 */
define(
    ['myclass', 'gma/market/Product'],
    function (my, Product) {
        "use strict";

        return my.Class(Product, {

            constructor: function (type, cost){
            	this.img = this.getTrash(color);
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
                    case 'yelllow':
                        this.img = 'trash-yellow.png';
                        break;      
                }
            }
        });
    }
)
;
