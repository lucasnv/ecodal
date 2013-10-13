/**
 * Class World
 * @extend: Entity
 */
define(['myclass', 'gma/Entity'], function (my, Entity) {

	"use strict";
	
    var World = my.Class(Entity, {

        constructor: function () {
        	console.log('Generate World');
        }

    });

    return World;
});