define(['myclass',
    'gma/World',
    'gma/Home',
    'gma/Scene',
    'gma/Conscience',
    'gma/Denizen',
    'gma/Idea'],
    function (my, World, Home, Scene, Conscience, Denizen, Idea) {
        "use strict";

        return my.Class({
            config: null,
            constructor: function (config) {
                console.log('Creando God con config: ', config);
                this.config = config;
            },
            create: function () {
                console.log('God', 'create', arguments);

                var world = new World();
                var home = new Home();
                console.log('Vitality home: ' + home.getVitality());
                var scene = new Scene();
                var conscience = new Conscience(this);
                var denizen = new Denizen(conscience);

            }
        });
    });
