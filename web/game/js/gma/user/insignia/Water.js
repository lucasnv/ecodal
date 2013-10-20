/**
 * Class Water
 * @extend: Insignia
 * 
 */
define(
    ['myclass', 'gma/user/Insignia'],
    function (my, Insignia) {
        "use strict";

        return my.Class(Insignia, {

            constructor: function () {
            	this.setImg = 'insignia-water.png';
            	this.cant = 0;
            },

        });
    }
)
;
