define(['myclass'],
    function (my) {
        "use strict";

        return my.Class({

            constructor: function (stage, look) {
                /* Attr*/
                this.parent = null;
                this.body = new createjs.Container();
                this.children = [];
                /* this.x = 0;
                 this.y = 0;
                 this.z = 0;*/
                this.stage = stage;

                this.state = {
                    gesture: null
                };

                this.look = look;
            },

            /*  setPosition: function(x, y ,z){
             this.x = x;
             this.y = y;
             this.z = z;
             },*/

            addChild: function (child) {
                child.parent = this;
                child.embody();
                this.children.push(child);
            },

            delParent: function (child) {
                child.parent = null;
            },

            //NO LA ENTIENDO
            embody: function () {
                if (this.stage && this.look) {
                    this.stage.addChild(this.body);

                    if (this.look.defaultLook) {
                        this.gesture(this.look.defaultLook);
                    }

                    this.render();
                }
            },

            gesture: function (name) {
                if (!this.gestures[name]) {
                    console.err('Entity', '::', 'gesture desconicida', name);
                    return;
                }

                if (this.state.gesture == name) {
                    return;
                }

                this.state.gesture = name;
                var gestureDef = this.look.gestures[name];

                if (!this.look.sprites[gestureDef.sprite]) {
                    console.err('Entity', '::', 'no se ha definido el sprite:', gestureDef.sprite)
                }

                var sprite = this.look.sprites[gestureDef.sprite];

                this.body.removeAllChildren();
                this.body.addChild(sprite);

                sprite.gotoAndPlay(gestureDef.animation);
            },

            act: function (action) {
                console.log('Entity', '::', 'actuando', 'acción:', action);

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
                    console.err('Entity', '::', 'Acción desconocida: ', action.name);
                    d.resolve();
                }

                return d.promise();
            },

            interact: function (target, action) {
                console.log('Entity', '::', 'interactuando', 'acción:', action);
                return target.act(action);
            },

            render: function () {
                if (this.stage && this.body) {
                    this.stage.update();
                }
            },

            // Acciones
            teleport: function (x, y) {
                this.body.x = x;
                this.body.y = y;
            },

            wait: function (milliseconds) {
                console.log('Denizen', '::', 'wait', arguments);
                var d = $.Deferred();

                _.delay(function () {
                    d.resolve();
                }, milliseconds);

                return d.promise();
            }
        });
    });