define(['myclass', 'gma/Entity'], function (my, Entity) {
    "use strict";

    var Denizen = my.Class(Entity, {
        conscience: null,
        constructor: function (conscience, container) {
            Denizen.Super.call(this, container);

            console.log('Creando Denizen con conscience:', conscience, 'y container:', container);

            if (!conscience) {
                throw new Error('No puede haber Denizen sin conscience');
            }

            this.conscience = conscience;

            // Esperar ideas
            this.conscience.thought.add(this.onThought);

            // Pensar
            this.conscience.think();
        },
        // Event handlers
        onThought: function (idea) {
            console.log('Denizen', 'recibió la idea', idea);
        }
    });

    return Denizen;
});