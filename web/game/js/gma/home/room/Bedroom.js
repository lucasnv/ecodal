define(['myclass', 'gma/home/Room'], function (my, Room) {
    var Bedroom = new my.Class(Room, {
        constructor: function (stage, look) {
            Bedroom.Super.call(this, stage, look);
        }
    });

    return Bedroom;
});