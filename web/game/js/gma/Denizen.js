define(['myclass', 'signals', 'gma/Entity', 'gma/Resource'], function (my, signals, Entity, Resource) {
    "use strict";

    var Denizen = my.Class(Entity, {
        constructor: function (conscience, stage) {
            this.speed = 0.1;
            this.conscience = null;
            this.state = {
                gesture: null
            };
            this.sprites = {
                idle: null,
                walk: null
            };
            this.gestures = {
                idle: {
                    sprite: 'idle',
                    animation: 'idle'
                },
                walkLeft: {
                    sprite: 'walk',
                    animation: 'walk'
                },
                walkRight: {
                    sprite: 'walk',
                    animation: 'walk_h'
                }
            };
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

        toString: function(){
            return 'denizen';
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

            var spriteSheet = new createjs.SpriteSheet({
                "images": [Resource.loader.getResult("monster_run")],
                "frames": {width: 64, height: 64, regX: 32, regY: 32},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {"walk": [0, 9, "walk"]}
            });

            createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);

            this.sprites.walk = new createjs.Sprite(spriteSheet, 'walk');

            var idleSpriteSheet = new createjs.SpriteSheet({
                "images": [Resource.loader.getResult("monster_idle")],
                "frames": {width: 64, height: 64, regX: 32, regY: 32},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {"idle": [0, 10, "idle"]}
            });

            this.sprites.idle = new createjs.Sprite(idleSpriteSheet, 'idle');

            this.body = new createjs.Container();

            this.gesture('idle');

            // Pensar
            this.think();

            if (this.stage && this.body) {
                this.stage.addChild(this.body);
                //this.render();
            }
        },
        gesture: function (name) {
            if (!this.gestures[name]) {
                console.log('Denizen', '::', 'gesture desconicida', name);
            }

            if (this.state.gesture == name) {
                return;
            }

            this.state.gesture = name;
            var gestureDef = this.gestures[name];
            var sprite = this.sprites[gestureDef.sprite];

            this.body.removeAllChildren();
            this.body.addChild(sprite);
            sprite.gotoAndPlay(gestureDef.animation);
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
            this.gesture('idle');
            this.body.x = x;
            this.body.y = y;
        },
        move: function (x, y) {
            var d = $.Deferred();

            if (!this.body) {
                d.resolve();
                return;
            }

            var self = this;

            var gestureName = self.body.x > x ? 'walkLeft' : 'walkRight';

            this.gesture(gestureName);

            var dx = x - this.body.x;
            var dy = y - this.body.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));
            var time = Math.round(distance / this.speed);

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