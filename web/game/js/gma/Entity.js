define(['myclass'],
    function (my) {
        "use strict";

        return my.Class({

            constructor: function (stage) {
                /* Attr*/
                this.parent = null;
                this.body = null;
                this.children = [];
                /* this.x = 0;
                 this.y = 0;
                 this.z = 0;*/
                this.stage = stage;

                this.state = {
                    gesture: null
                };

                this.sprites = {};
                this.gestures = {};
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
                if (this.stage && this.body) {
                    this.stage.addChild(this.body);
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
                var gestureDef = this.gestures[name];

                if (!this.sprites[gestureDef.sprite]) {
                    console.err('Entity', '::', 'no se ha definido el sprite:', gestureDef.sprite)
                }

                var sprite = this.sprites[gestureDef.sprite];

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
            }
        });
    });