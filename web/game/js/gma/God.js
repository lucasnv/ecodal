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

                var stage = this.createStage();

                for (var i = 0; i < 100; i++) {
                    var conscience = new Conscience(this);
                    var denizen = new Denizen(conscience, stage);
                    home.addChild(denizen);
                }

                home.addChild(denizen2);
            }
        });
    });
