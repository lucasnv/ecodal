define(['myclass', 'gma/Entity'], function (my, Entity) {
    "use strict";

    var Denizen = my.Class(Entity, {
        conscience: null,
        state: {

        },
        constructor: function (conscience, container) {
            Denizen.Super.call(this, container);

            console.log('Creando Denizen con conscience:', conscience, 'y container:', container);

            if (!conscience) {
                throw new Error('No puede haber Denizen sin conciencia');
            }

            this.conscience = conscience;

            // Esperar ideas
            this.conscience.on['thought'].add(this.onThought, this);

            // Pensar
            this.think();
        },
        think: function () {
            this.conscience.think();
        },
        interpret: function (idea) {
            console.log('Denizen', '::', 'interpretando', 'idea:', idea);
            console.log('   ', 'cantidad de acciones:', idea.length());

            if (idea.length() == 0) {
                console.log('   ', 'No hay acciones en la idea');
                return;
            }

            var self = this;

            var chain = null;

            idea.each(function (action) {
                if (!chain) {
                    chain = self.act(action);
                } else {
                    chain = chain.then(function () {
                        return self.act(action);
                    });
                }
            });

            chain.always(function () {
                console.log('Denizen', '::', 'terminó de realizar la idea');
                //self.think();
            });
        },
        act: function (action) {
            console.log('Denizen', '::', 'actuando', 'acción:', action);

            var d = $.Deferred();

            if (_.isFunction(this[action.name])) {
                var promise = this[action.name].apply(this, action.params);

                // Es una promesa?
                if (promise && _.isFunction(promise.promise)) {
                    promise.then(
                        function () {
                            d.resolve();
                        }, function () {
                            d.resolve();
                        }
                    );
                } else {
                    d.resolve();
                }
            } else {
                console.log('Denizen', '::', 'Acción desconocida: ', action.name);
                d.resolve();
            }

            return d.promise();
        },
        // Acciones
        sayHello: function () {
            console.log('Denizen', '::', 'sayHello', arguments);
        },
        wait: function (milliseconds) {
            console.log('Denizen', '::', 'wait', arguments);
            var d = $.Deferred();

            _.delay(function () {
                d.resolve();
            }, milliseconds);

            return d.promise();
        },
        // Event handlers
        onThought: function (idea) {
            console.log('Denizen', '::', 'recibió la idea', idea);
            this.interpret(idea);
        }
    });

    return Denizen;
});