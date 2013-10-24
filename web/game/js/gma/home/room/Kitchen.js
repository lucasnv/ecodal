define(['myclass', 'gma/home/Room', 'gma/Resource'], function (my, Room, Resource) {
    var Kitchen = new my.Class(Room, {
        constructor: function (stage, look) {
            Kitchen.Super.call(this, stage, look);

            this.faucet = new createjs.Container();
            var faucetSpriteSheet = new createjs.SpriteSheet({
                "images": [Resource.loader.getResult('faucet')],
                "frames": {width: 41, height: 40, regX: 0, regY: 0, count: 2},
                "animations": {
                    "on": 1,
                    "off": 0
                }
            });
            var faucetSprite = new createjs.Sprite(faucetSpriteSheet, 'off');
            faucetSprite.name = 'faucet';
            this.faucet.addChild(faucetSprite);

            this.faucet.x = 115;
            this.faucet.y = 100;
            this.body.addChild(this.faucet);
        }
    });

    return Kitchen;
});