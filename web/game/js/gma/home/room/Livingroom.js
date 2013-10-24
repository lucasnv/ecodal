define(['myclass', 'gma/home/Room'], function (my, Room) {
    var Livingroom = new my.Class(Room, {
        constructor: function (stage, look) {
            Livingroom.Super.call(this, stage, look);
        }
    });

    return Livingroom;
});