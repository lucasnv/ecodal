define(['myclass', 'gma/Entity'], function (my, Entity) {
    "use strict";

    var Denizen = my.Class(Entity, {
        conscience: null,
        constructor: function (conscience, container) {
            console.log('Creando Denizen con conscience:', conscience, 'y container:', container);

            if(!conscience) {
                throw new Error('No puede haber Denizen sin conscience');
            }

            Denizen.Super.call(this, container);
            this.conscience = conscience;
        }
    });

    return Denizen;
});