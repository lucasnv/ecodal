/**
 * Class Scene
 * @extend: Entity
 */
define(['myclass', 'gma/Entity'], function (my, Entity) {

    var Scene = my.Class(Entity, {

        constructor: function () {
        	console.log('Generate Scene');
        }

    });

    return Scene;
});