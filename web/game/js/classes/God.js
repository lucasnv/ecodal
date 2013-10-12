/**
 * Class God
 * @Extend: Entity
 * @Description: Encargado de enlazar todas las clases y crear el mundo desde una configuración
 * 
 */
God = new JS.Class({
    config: null,
    initialize: function (config) {
        this.config = config;

        console.log('Creando God con config', config);
    },
    create: function () {
        var self = this;

        console.log('Creando el mundo');

        _.each(this.config.children, function (child) {
            console.log('creando child: ', child.id);
            var conscience = new Conscience(self);
            var d = new Denizen(null, conscience);
            console.log(d);
        })
    }
});

