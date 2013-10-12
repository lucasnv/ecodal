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

                var homeStage = new createjs.Stage('main_canvas');
                var home = new Home(homeStage);

                console.log('Vitality home: ' + home.getVitality());
                var scene = new Scene();

                var denizenStage = new createjs.Stage('denizen_canvas');
                var conscience = new Conscience(this);
                var denizen = new Denizen(conscience, denizenStage);

                home.addChild(denizen);

            }
        });
    });
