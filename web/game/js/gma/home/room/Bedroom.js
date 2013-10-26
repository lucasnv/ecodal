define(['myclass', 'gma/home/Room', 'gma/Entity', 'gma/Resource', 'gma/Look'], function (my, Room, Entity, Resource, Look) {
    var Bedroom = new my.Class(Room, {
        constructor: function (stage, look) {
            Bedroom.Super.call(this, stage, look);

            var self = this;

            var parcheSpriteSheet = new createjs.SpriteSheet({
                "images": [Resource.loader.getResult('parche')],
                "frames": {width: 100, height: 70, regX: 0, regY: 0},
                "animations": {
                    "on": 0,
                    "off": 1
                }
            });

            var look = new Look({
                parche: new createjs.Sprite(parcheSpriteSheet, 'off')
            }, {
                on: [
                    {
                        direction: 90,
                        sprite: 'parche',
                        animation: 'on'
                    }
                ],
                off: [
                    {
                        direction: 90,
                        sprite: 'parche',
                        animation: 'off'
                    }
                ]
            }, 'off');

            this.parche = new Entity(this.stage, look);

            this.addChild(this.parche);

            this.stage.on('drawstart', function () {
                self.parche.setPosition({
                    x: self.body.x,
                    y: self.body.y + 200,
                    z: 0
                });

                if (self.hasActivity('light')) {
                    var lightActivity = self.getActivity('light');
                    if (lightActivity.isResolved()) {
                        self.parche.gesture('off');
                    } else {
                        self.parche.gesture('on');
                    }
                }

                if (self.denizens.length)
                    self.stage.setChildIndex(self.parche.body, self.stage.getNumChildren() - 1);

                _.each(self.denizens, function (denizen) {
                    var denizenPos = denizen.getPosition();
                    var denizenIndex = self.stage.getChildIndex(denizen.body);

                    var parchePos = self.parche.getPosition();
                    var parcheIndex = self.stage.getChildIndex(self.parche.body);

                    if (denizenPos.z <= parchePos.z && denizenIndex < parcheIndex) {
                        self.stage.swapChildrenAt(denizenIndex, parcheIndex);
                    }
                });

            });
        }
    });

    return Bedroom;
});