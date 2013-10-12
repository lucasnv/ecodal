define(['myclass'], function (my) {
    "use strict";

    return my.Class({
        name: '',
        params: [],
        constructor: function (name, params) {
            console.log('Creando Action con name:', name, 'y params:', params);
            this.name = name || '';
            this.params = params || [];
        }
    });

});
