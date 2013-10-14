define(['myclass', 'gma/entity'], function (my, Entity) {
    var Room = my.Class(Entity, {
        constructor: function (stage, look) {
            Room.Super.call(this, stage, look);
        }
    });

    return Room;
});
