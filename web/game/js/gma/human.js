/**
 * Class World
 * @extend: Entity
 */
define(['myclass', 'gma/Denizen'], function (my, Denizen) {

	"use strict";
	
    var Human = my.Class(Denizen, {

        constructor: function (conscience, stage, look, speed) {
        	Human.Super.call(this, conscience, stage, look, speed);
        	console.log('Genero un humano');
        }



    });

    return Human;
});