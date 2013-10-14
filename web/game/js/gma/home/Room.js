define(['myclass', 'gma/entity'], function (my, Entity) {
    var Room = my.Class(Entity, {
        constructor: function (stage, look) {
            Room.Super.call(this, stage, look);

            this.ligthsOn = false;
        },

        lights: function (value) {
            this.ligthsOn = value;

            if (value) {
                var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
                var filter = new createjs.ColorMatrixFilter(matrix);
                this.body.filters = [filter];
                this.body.cache(0, 0, 1000, 500);
            } else {
                this.body.filters = [];
                this.body.cache(0, 0, 1000, 500);
            }

            this.render();
        }
    });

    return Room;
});
