/**
 * Class Recycling
 * @extend: Insignia
 */
define(
    ['myclass', 'gma/user/Insignia'],
    function (my, Insignia) {
        "use strict";

        var insignia =  my.Class(Insignia, {

            constructor: function () {
                insignia.Super.call(this);
            	this.img = 'insignia-recycling.png';
            },

            toString: function(){
                return 'insigniaRecycling';
            }
        });

        return insignia;
    }
)
;
