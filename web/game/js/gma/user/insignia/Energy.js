/**
 * Class Energy
 * @extend: Insignia
 */
define(
    ['myclass', 'gma/user/Insignia'],
    function (my, Insignia) {
        "use strict";

        return my.Class(Insignia, {

            constructor: function () {
            	this.setImg = 'insignia-energy.png';
            	this.cant = 0;
            },

        });
    }
)
;
