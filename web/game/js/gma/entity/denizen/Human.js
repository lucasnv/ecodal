/**
 * Class World
 * @extend: Entity
 */
define(['myclass', 'gma/entity/Denizen'], function (my, Denizen) {

    "use strict";

    var Human = my.Class(Denizen, {
        constructor: function (conscience, stage, look, speed) {
            console.log('Human', '::', 'constructor');
            Human.Super.call(this, conscience, stage, look, speed);
            this.setVitality(100);
        }

    });

    return Human;
});