/**
 * Class Energy
 * @extend: Insignia
 */
define(
    ['myclass', 'gma/user/Insignia'],
    function (my, Insignia) {
        "use strict";

        var insignia =  my.Class(Insignia, {

            constructor: function () {
                insignia.Super.call(this);
            	this.img = 'insignia-energy.png';
            },

            toString: function(){
                return 'insigniaEnergy';
            }
        });

        return insignia;
    }
)
;
