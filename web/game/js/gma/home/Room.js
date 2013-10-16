define(['myclass', 'gma/Entity', 'gma/home/Power'], function (my, Entity, Power) {
    var Room = my.Class(Entity, {
        constructor: function (stage, look) {
            Room.Super.call(this, stage, look);

            this.ligthsOn = false;
            this.power = new Power();
        },

        toString: function () {
            return 'room';
        },

        lights: function (value) {
            this.ligthsOn = value;

            if (value) {
                this.power.energy = 1;
                var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
                var filter = new createjs.ColorMatrixFilter(matrix);
                this.body.filters = [filter];
                this.body.cache(this.body.x, this.body.y, this.body.width, this.body.height);
            } else {
                this.power.energy = 0;
                console.log('apago');
                this.body.filters = [];
                this.body.cache(this.body.x, this.body.y, this.body.width, this.body.height);
            }

            this.render();
        }
    });

    return Room;
});
