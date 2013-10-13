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
            constructor: function (config) {
                console.log('Creando God con config: ', config);
                this.config = config;
                this.stageCount = 0;
            },
            createStage: function () {
                var stageId = 'gma_stage_' + (this.stageCount++);
                var $canvas = $('<canvas id="' + stageId + '" class="gma_canvas" width="500" height="500"></canvas>');
                $('#gma_container').append($canvas);

                return new createjs.Stage(stageId);
            },
            create: function () {
                console.log('God', 'create', arguments);

                var world = new World();

                //var homeStage = this.createStage();
                var home = new Home(/*homeStage*/);

                console.log('Vitality home: ' + home.getVitality());
                var scene = new Scene();

                var denizenStage1 = this.createStage();
                denizenStage1.caca = 1;
                var conscience1 = new Conscience(this);
                conscience1.caca = 1;
                var denizen1 = new Denizen(conscience1, denizenStage1);
                home.addChild(denizen1);

                var denizenStage2 = this.createStage();
                denizenStage2.caca = 2;
                var conscience2 = new Conscience(this);
                conscience2.caca = 2;
                var denizen2 = new Denizen(conscience2, denizenStage2);

                console.log(denizen1 == denizen2);

                home.addChild(denizen2);
            }
        });
    });
