define(
    ['myclass',
        'gma/World',
        'gma/Home',
        'gma/Scene',
        'gma/Conscience',
        'gma/Denizen',
        'gma/Idea',
        'gma/Action'
    ],
    function (my, World, Home, Scene, Conscience, Denizen, Idea, Action) {
        "use strict";

        return my.Class({

            constructor: function (config) {
                this.container = '#gma_container';
                this.config = config;
                this.stageCount = 0;
            },

            createStage: function (autorender) {
                var stageId = this.getStageId();
                var canvas = this.newCanvas(stageId, 1000, 500);    

                var stage = new createjs.Stage(stageId);

                if (autorender) {
                    createjs.Ticker.addEventListener("tick", function () {
                        stage.update();
                    });
                }

                return stage;
            },

            getStageId: function(){
                return 'gma_stage_' + (this.stageCount++);
            },

            newCanvas: function(stageId, width, height){                
                var canvas = $('<canvas id="' + stageId + '" class="gma_canvas" width="'+ width +'" height="'+ height +'"></canvas>');                
                this.appendStage(canvas);
                return canvas;
            },

            appendStage : function(canvas){
                $(this.container).append(canvas);
            },

            create: function () {

                var world = new World();

                //var homeStage = this.createStage();
                var home = new Home(/*homeStage*/);

                var scene = new Scene();

                //var stage = this.createStage(true);

                /*
                 for (var i = 0; i < 10; i++) {
                 //var stage = this.createStage();
                 var conscience = new Conscience(this);
                 var denizen = new Denizen(conscience, stage);
                 home.addChild(denizen);

                 }
                 */

                var stage = this.createStage(true);

                var conscience1 = new Conscience(this);
                var denizen1 = new Denizen(conscience1, stage);
                home.addChild(denizen1);

                denizen1.body.x = 0;
                denizen1.body.y = 0;

                var conscience2 = new Conscience(this);
                var denizen2 = new Denizen(conscience2, stage);
                home.addChild(denizen2);

                var idea = new Idea();
                idea.addItem(new Action('teleport', [200, 200]));
                idea.addItem(new Action('wait', [3000]));
                idea.addItem(new Action('teleport', [200, 0]));

                idea.addItem(new Action('interact', [
                    denizen1, new Action('interpret', [new Idea([
                        new Action('move', [200, 400])
                    ])])
                ]));

                denizen2.interpret(idea);
            }
        });
    }
)
;
