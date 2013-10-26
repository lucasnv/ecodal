/**
 * Class Denizen
 * @Extend: Entity, Resource
 */
define(['myclass', 'signals', 'gma/Entity', 'gma/Idea'],
    function (my, Signal, Entity, Idea) {
        "use strict";

        var Denizen = my.Class(Entity, {

            constructor: function (conscience, stage, look, speed) {
                console.log('Denizen', '::', 'constructor');
                if (!conscience) {
                    throw new Error('No puede haber Denizen sin conciencia');
                }

                /* Attr */
                this.vitality = 0;
                this.conscience = conscience;
                this.speed = speed;
                this.on = {
                    interpreted: new Signal(),
                    halted: new Signal()
                };

                this.memory = undefined;

                // Referencia bidireccional
                this.conscience.denizen = this;

                // Cuando la conciencia produjo una idea...
                this.conscience.on['thought'].add(this.onThought, this);

                // Cuando el denizen termino de procesar una idea...
                this.on['interpreted'].add(this.onInterpreted, this);

                Denizen.Super.call(this, stage, look);

                //this.think();
            },

            setVitality: function (vitality) {
                this.vitality = vitality;
            },

            think: function () {
                this.conscience.think();
            },

            halt: function () {
                var d = $.Deferred();

                console.log('Denizen', '::', 'halt');
                TweenMax.killTweensOf(this.body);

                if (this.state.act) {
                    console.log('Rejecting current act');
                    this.state.act.reject();
                    this.state.act = null;
                }

                if (this.memory) {
                    console.log('Rejecting memory');

                    this.memory.reject();
                    this.gesture('idle');
                    this.memory = null;
                }

                this.on['halted'].dispatch(this);

                d.reject();

                return d;
            },

            /* Interpreta el conjunto de acciones que representan una idea*/
            interpret: function (idea) {
                var self = this;

                if (idea.length() == 0) {
                    this.on['interpreted'].dispatch(idea);
                    return;
                }

                var chain = this.excecute(idea);

                this.memory = chain;

                chain.done(function () {
                    console.log('Denizen', '::', 'Action chain completed');
                    self.on['interpreted'].dispatch(idea);
                });

                return chain;
            },

            /**
             * Ejecuta las ideas
             *
             * @param idea
             * @returns Deferred
             */
            excecute: function (idea) {
                console.log('Denizen', '::', 'excecute', idea);

                var self = this;
                var chain = undefined;

                idea.each(function (action) {
                    if (!chain) {
                        chain = self.act(action);
                    } else {
                        var d = $.Deferred();

                        chain.done(function () {
                            var dd = self.act(action);
                            dd.done(function () {
                                d.resolve();
                            });
                        });

                        chain = d;
                    }
                });

                return chain;
            },

            /**
             * Evalúa una condición(función) en determinado contexto
             */
            evaluate: function (condition, context) {
                var d = $.Deferred();

                context = context || this;

                if (_.isFunction(condition)) {
                    var result = condition.call(context);

                    // Si no hay resultado de la condicion
                    if (result === undefined) {
                        d.resolve();
                    }

                    // Si la respuesta es una idea
                    if (result instanceof  Idea) {
                        this.excecute(result).done(function () {
                            d.resolve();
                        });
                        // Si la respuesta de la condición es una promesa
                    } else if (_.isFunction(result.promise)) {
                        result.done(function () {
                            d.resolve();
                        }, function () {
                            d.reject();
                        });
                        // Si la respuesta es un booleano
                    } else if (_.isBoolean(result)) {
                        if (result) {
                            d.resolve();
                        } else {
                            d.reject();
                        }

                        // SI la respuesta es un objeto
                    } else {
                        d.resolve(result);
                    }
                } else {
                    console.error('Denizen', '::', 'la condición no es una función');
                    d.reject();
                }

                return d;
            },

            move: function (x, y, z) {
                var d = this.fly(x, y, z);

                this.gesture('walk');

                var self = this;

                d.done(function () {
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