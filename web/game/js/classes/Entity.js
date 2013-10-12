Existant = JS.Class({
    container: null,
    initialize: function (container) {
        console.log('Creando entity');

        if (container)
            this.container = $(container);
    },
    getContainer: function () {
        return this.container;
    }
});
