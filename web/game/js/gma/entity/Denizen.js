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
                    interpreted: new Signal(),
                    halted: new Signal()
                };

                this.memory = [];

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

            halt: function () {
                console.log('Denizen', '::', 'halt');
                TweenMax.killTweensOf(this.body);

                if (this.state.act) {
                    this.state.act.reject();
                    this.state.act = null;
                }

                if (this.memory) {
                    this.memory.reject();
                    this.gesture('idle');
                    this.memory = null;
                }

                this.on['halted'].dispatch(this);
            },

            /* Interpreta el conjunto de acciones que representan una idea*/
            interpret: function (idea) {

                var self = this;
                var chain = undefined;

                if (idea.length() == 0) {
                    this.on['interpreted'].dispatch(idea);
                    return;
                }

                //Debo preguntar si alguien implanto una nueva idea (FALTA)
                idea.each(function (action) {
                    if (!chain) {
                        chain = self.act(action);
                    } else {
                        var d = $.Deferred();

                        chain.then(function () {
                            var dd = self.act(action);
                            dd.then(function () {
                                d.resolve();
                            });
                        });

                        chain = d;
                    }
                });

                chain.then(function () {
                    self.on['interpreted'].dispatch(idea);
                });

                this.memory = chain;

                return chain;
            },

            move: function (x, y) {
                var d = this.fly(x, y);

                this.gesture('walk');

                var self = this;

                d.then(function () {
                    self.gesture('idle');
                });

                return d;
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