define(['gma/Resource', 'myclass', 'gma/home/Room', 'gma/home/room/iLightRoom', 'gma/activity', 'gma/Activity'],
    function (Resource, my, Room, iLightRoom, Activity) {
        var Kitchen = my.Class(Room, iLightRoom, {
            constructor: function (stage, look) {
                Kitchen.Super.call(this, stage, look);

                var self = this;

                // Assets
                var lightSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult("light")],
                    "frames": {"regX": 0, "height": 48, "count": 2, "regY": 0, "width": 48},
                    "animations": {
                        "on": [1],
                        "off": [0]
                    }
                });

                this.light = new createjs.Sprite(lightSpriteSheet, "off");
                this.stage.addChild(this.light);

                // Registrar actividades
                var lightsActivity = new Activity('light', this);

                lightsActivity.on['started'].add(function () {
                    self.toggle(true);
                });

                lightsActivity.on['resolved'].add(function () {
                    self.toggle(false);
                });

                this.addActivity(lightsActivity);
            },

            update: function () {
                this.light.x = this.body.x + 200;
                this.light.y = this.body.y;
                Kitchen.Super.prototype.update.call(this);
            }
        });

        return Kitchen;
    });
