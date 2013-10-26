define(['myclass'],
    function (my) {
        "use strict";

        return my.Class({

            constructor: function (stage, look) {
                console.log('Entity', '::', 'constructor');
                /* Attr*/
                this.parent = null;
                this.body = new createjs.Container();
                this.body.z = 0;
                this.gestures = new createjs.Container();
                this.body.addChild(this.gestures);

                this.body.entity = this;
                this.children = [];
                this.stage = stage;

                this.state = {
                    act: null,
                    gesture: null
                };

                this.direction = 90;

                this.look = look;

                this.embody();
            },

            embody: function () {
                console.log('Entity', '::', 'embody');
                if (this.stage && this.look) {
                    this.stage.addChild(this.body);

                    if (this.look.defaultGesture) {
                        this.gesture(this.look.defaultGesture);
                    }
                }
            },

            setPosition: function (position) {
                this.body.x = position.x || 0;
                this.body.y = position.y || 0;
                this.body.z = position.z || 0;
            },

            getPosition: function () {
                return {
                    x: this.body.x,
                    y: this.body.y,
                    z: this.body.z
                }
            },

            addChild: function (child) {
                if (child.parent) {
                    child.parent.removeChild(child);
                }
                child.parent = this;
                this.children.push(child);
            },

            removeChild: function (child) {
                var index = this.children.indexOf(child);
                if (index > -1) {
                    this.children.splice(index, 1);
                }
            },

            gesture: function (name) {
                var d = $.Deferred();

                this.state.gesture = name;

                var gestureDef = this.look.getGesture(name, this.direction);

                if (!gestureDef) {
                    console.error('Entity', '::', 'No se encontro el gesture', name, 'para la dirección', this.direction);
                    d.reject();
                }

                var sprite = this.look.sprites[gestureDef.sprite];

                sprite.setTransform(0, 0, this.direction < 0 ? -1 : 1);

                this.gestures.removeAllChildren();
                this.gestures.addChild(sprite);

                sprite.gotoAndStop(gestureDef.animation);
                sprite.play();

                var onAnimationEnd = function (event) {
                    d.resolve();
                };

                sprite.on('animationend', onAnimationEnd, this, true);

                return d;
            },

            act: function (action) {
                console.log('Entity', '::', 'actuando', 'acción:', action);

                var d = $.Deferred();

                var self = this;

                var clearAct = function () {
                    if (self.state.act == d) {
                        self.state.act = null;
                    }
                };

                if (_.isFunction(this[action.name])) {
                    var promise = this[action.name].apply(this, action.params);

                    // Es una promesa?
                    if (promise && _.isFunction(promise.promise)) {
                        promise.done(
                            function () {
                                clearAct();
                                d.resolve();
                            }, function () {
                                clearAct();
                                d.resolve();
                            }
                        );
                    } else {
                        clearAct();
                        d.resolve();
                    }
                } else {
                    console.error('Entity', '::', 'Acción desconocida: ', action.name);
                    clearAct();
                    d.resolve();
                }

                this.state.act = d;

                return d;
            },

            interact: function (target, action) {
                console.log('Entity', '::', 'interactuando', 'acción:', action);
                return target.act(action);
            },

            update: function () {
                this.render();
            },

            render: function () {
                if (this.stage) {
                    this.stage.update();
                }
            },

            // Acciones
            teleport: function (x, y) {
                this.body.x = x;
                this.body.y = y;
            },

            fly: function (x, y, z) {
                z = z || 0;
                var d = $.Deferred();

                if (!this.body) {
                    d.resolve();
                    return d;
                }

                var self = this;

                var dx = x - this.body.x;
                var dy = y - this.body.y;
                var distance = Math.sqrt((dx * dx) + (dy * dy));
                var time = Math.round(distance / this.speed);
                var seconds = time * 0.001;

                if (this.body.x != x)
                    this.direction = this.body.x < x ? 90 : -90;

                console.log('z', z);

                TweenMax.to(this.body, seconds, {x: x, y: y, z: z, ease: Linear.easeNone, onComplete: function () {
                    self.gesture('idle');
                    d.resolve();
                }});

                return d;
            },

            wait: function (milliseconds) {
                console.log('Denizen', '::', 'wait', arguments);
                var d = $.Deferred();

                _.delay(function () {
                    d.resolve();
                }, milliseconds);

                return d;
            },

            delay: function (milliseconds, action) {
                var self = this;
                var p1 = this.wait(milliseconds);
                p1.done(function () {
                    self.act(action);
                });
            }
        });
    });