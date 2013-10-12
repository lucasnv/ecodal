define(['myclass',
    'gma/Conscience',
    'gma/Denizen',
    'gma/Idea'],
    function (my, Conscience, Denizen, Idea) {
        "use strict";

        return my.Class({
            config: null,
            constructor: function (config) {
                console.log('Creando God con config: ', config);
                this.config = config;
            },
            create: function () {
                console.log('God', 'create', arguments);

                var conscience = new Conscience(this);
                var denizen = new Denizen(conscience);
            }
        });
    });
