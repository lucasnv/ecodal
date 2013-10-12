Denizen = new JS.Class(Existant, {
    conscience: null,
    initialize: function (container, conscience) {
        if (!conscience) {
            throw new Error('No hay Denizen sin conciencia');
        }
        console.log('Entity', Existant);

        console.log('Creando Denizen con conciencia', conscience);

        this.conscience = conscience;

        console.log(this);

        //this.callSuper(container);
    }
});
