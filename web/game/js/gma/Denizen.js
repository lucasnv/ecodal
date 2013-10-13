define(['myclass', 'signals', 'gma/Entity', 'gma/Resource'], function (my, signals, Entity, Resource) {
    "use strict";

    var Denizen = my.Class(Entity, {
        constructor: function (conscience, stage) {
            this.speed = 0.5;
            this.conscience = null;
            this.state = {};
            this.on = {
                interpreted: new signals()
            };

            Denizen.Super.call(this, stage);

            console.log('Denizen', '::', 'constructor', 'conscience:', conscience);

            if (!conscience) {
                throw new Error('No puede haber Denizen sin conciencia');
            }

            this.conscience = conscience;

            // Referencia bidireccional
            this.conscience.denizen = this;

            // Cuando la conciencia produjo una idea...
            this.conscience.on['thought'].add(this.onThought, this);

            // Cuando el denizen termino de procesar una idea...
            this.on['interpreted'].add(this.onInterpreted, this);
        },
        think: function () {
            this.conscience.think();
        },
        interpret: function (idea) {
            console.log('Denizen', '::', 'interpretando', 'idea:', idea);
            console.log('   ', 'cantidad de acciones:', idea.length());

            if (idea.length() == 0) {
                console.log('   ', 'No hay acciones en la idea');
                this.on['interpreted'].dispatch(idea);
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
                self.on['interpreted'].dispatch(idea);
            });

            return chain;
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
        interact: function (target, action) {
            console.log('Denizen', '::', 'interactuando', 'acción:', action);
            return target.act(action);
        },
        embody: function () {
            if (this.body) {
                return;
            }

            console.log('Denizen', '::', 'embody');

            var data = new createjs.SpriteSheet({
                "images": [Resource.loader.getResult("denizen")],
                "frames": {"regX": 0, "height": 292, "count": 64, "regY": 0, "width": 165},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {"run": [0, 25, "run", 1.5], "jump": [26, 63, "run"]}
            });

            this.body = new createjs.Sprite(data, "run");
            this.body.setTransform(-200, 90, 0.8, 0.8);
            this.body.framerate = 30;
            this.body.gotoAndPlay("run");

            // Pensar
            this.think();

            if (this.stage && this.body) {
                this.stage.addChild(this.body);
                //this.render();
            }
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
        teleport: function (x, y) {
            this.body.x = x;
            this.body.y = y;
            this.render();
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

            createjs.Tween.get(this.body).to({x: x, y: y}, time)
                .call(function () {
                    d.resolve();
                })
                .addEventListener("change", function () {
                    //self.render();
                });

            return d.promise();
        },
        // Event handlers
        onThought: function (idea) {
            this.interpret(idea);
        },
        onInterpreted: function (idea) {
            console.log('Denizen', '::', 'terminó de interpretar la idea:', idea);
            this.think();
        }
    });

    return Denizen;
});