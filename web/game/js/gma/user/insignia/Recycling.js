/**
 * Class Market
 * 
 */
define(
    ['myclass', 'gma/user/Insignia'],
    function (my, Insignia) {
        "use strict";

        return my.Class(Insignia, {

            constructor: function () {
            	this.setImg = 'insignia-recycling.png';
            	this.cant = 0;
            },

        });
    }
)
;
