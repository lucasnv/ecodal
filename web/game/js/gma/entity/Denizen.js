/**
 * Class Denizen
 * @Extend: Entity, Resource
 */
define(['myclass', 'signals', 'gma/Entity', 'gma/Resource'],
    function (my, Signal, Entity, Resource) {
        "use strict";

        var Denizen = my.Class(Entity, {

            constructor: function (conscience, stage, look, speed) {
                console.log('Denizen', '::', 'constructor');
                if (!conscience) {
                    throw new Error('No puede haber Denizen sin conciencia');
                }

                /* Attr */
                this.conscience = conscience;
                this.speed = speed;
                this.on = {
                    interpreted: new Signal()
                };

                // Referencia bidireccional
                this.conscience.denizen = this;

                // Cuando la conciencia produjo una idea...
                this.conscience.on['thought'].add(this.onThought, this);

                // Cuando el denizen termino de procesar una idea...
                this.on['interpreted'].add(this.onInterpreted, this);

                Denizen.Super.call(this, stage, look);

                this.conscience.think();
            },

            think: function () {
                this.conscience.think();
            },

            /* Interpreta el conjunto de acciones que representan una idea*/
            interpret: function (idea) {

                var self = this;
                var chain = null;

                if (idea.length() == 0) {
                    this.on['interpreted'].dispatch(idea);
                    return;
                }

                //Debo preguntar si alguien implanto una nueva idea (FALTA)
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
                    self.on['interpreted'].dispatch(idea);
                });

                return chain;
            },

            move: function (x, y) {
                var d = $.Deferred();

                if (!this.body) {
                    d.resolve();
                    return;
                }

                var self = this;

                var dx = x - this.body.x;
                var dy = y - this.body.y;
                var distance = Math.sqrt((dx * dx) + (dy * dy));
                var time = Math.round(distance / this.speed);

                if (this.body.x != x)
                    this.direction = this.body.x < x ? 90 : -90;

                this.gesture('walk');

                createjs.Tween.get(this.body).to({x: x, y: y}, time)
                    .call(function () {
                        self.gesture('idle');
                        d.resolve();
                    })
                    .addEventListener("change", function () {
                        //self.render();
                    });

                return d.promise();
            },

            //En mi pensamiento interpreto
            onThought: function (idea) {
                this.interpret(idea);
            },

            //Termino de interpretar la idea y comienzo a pensar nuevamente
            onInterpreted: function (idea) {
                this.think();
            }
        });

        return Denizen;
    });