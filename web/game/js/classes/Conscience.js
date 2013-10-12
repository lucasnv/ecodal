/**
 * Class Conscience
 * @Extend: Entity
 */
Conscience = new JS.Class({
    god: null,
    initialize: function (god) {
        if (!god) {
            throw new Error('No hay consciencia sin Dios');
        }
        this.god = god;
    }
});
