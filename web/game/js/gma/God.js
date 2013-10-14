define(
    ['myclass',
        'gma/World',
        'gma/Home',
        'gma/Scene',
        'gma/Conscience',
        'gma/entity/Denizen',
        'gma/entity/denizen/Human',
        'gma/Idea',
        'gma/Action',
        'gma/Look',
        'gma/Resource'
    ],
    function (my, World, Home, Scene, Conscience, Denizen, Human, Idea, Action, Look, Resource) {
        "use strict";

        return my.Class({

            constructor: function (config) {
                /* Attr*/
                this.container = '#gma_container';
                this.config = config;
                this.stageCount = 0;
                this.speedHuman = 0.1;
            },

            createStage: function (width, height, autorender) {
                var stageId = this.getStageId();
                var canvas = this.newCanvas(stageId, width, height);

                var stage = new createjs.Stage(stageId);

                if (autorender) {
                    createjs.Ticker.addEventListener("tick", function () {
                        stage.update();
                    });
                }

                return stage;
            },

            getStageId: function () {
                return 'gma_stage_' + (this.stageCount++);
            },

            newCanvas: function (stageId, width, height) {
                var canvas = $('<canvas id="' + stageId + '" class="gma_canvas" width="' + width + '" height="' + height + '"></canvas>');
                this.appendStage(canvas);
                return canvas;
            },

            appendStage: function (canvas) {
                $(this.container).append(canvas);
            },

            create: function () {

                var home = new Home(/*homeStage*/);
                this.createHuman(2, this.speedHuman, home);

                /*
                 var idea = new Idea();
                 idea.addItem(new Action('teleport', [200, 200]));
                 idea.addItem(new Action('wait', [3000]));
                 idea.addItem(new Action('teleport', [200, 0]));

                 idea.addItem(new Action('interact', [
                 human1, new Action('interpret', [new Idea([
                 new Action('move', [200, 400])
                 ])])
                 ]));

                 human2.interpret(idea);*/
            },

            createHuman: function (cant, speed, source) {

                var walkSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult("human_run")],
                    "frames": {width: 64, height: 64, regX: 32, regY: 32},
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                    "animations": {"walk": [0, 9, "walk"]}
                });

                createjs.SpriteSheetUtils.addFlippedFrames(walkSpriteSheet, true, false, false);

                var idleSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult("human_idle")],
                    "frames": {width: 64, height: 64, regX: 32, regY: 32},
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                    "animations": {"idle": [0, 10, "idle"]}
                });

                // Human Look
                var look = new Look({
                    walk: new createjs.Sprite(walkSpriteSheet, 'walk'),
                    idle: new createjs.Sprite(idleSpriteSheet, 'idle')
                }, {
                    idle: {
                        sprite: 'idle',
                        animation: 'idle'
                    },
                    walkRight: {
                        sprite: 'walk',
                        animation: 'walk_h'
                    },
                    walkLeft: {
                        sprite: 'walk',
                        animation: 'walk'
                    }
                }, 'idle');

                var stage = this.createStage(1000, 500, true);
                var conscience = null;
                var human = null;

                for (var i = 0; i < cant; ++i) {
                    var conscience = new Conscience(this);
                    var human = new Human(conscience, stage, look, speed);
                    source.addChild(human);
                }
            }

        });
    }
)
;
