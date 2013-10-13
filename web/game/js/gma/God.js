define(
    ['myclass',
        'gma/World',
        'gma/Home',
        'gma/Scene',
        'gma/Conscience',
        'gma/Denizen',
        'gma/Human',
        'gma/Idea',
        'gma/Action'
    ],
    function (my, World, Home, Scene, Conscience, Denizen, Human, Idea, Action) {
        "use strict";

        return my.Class({

            constructor: function (config) {
                /* Attr*/
                this.container = '#gma_container';
                this.config = config;
                this.stageCount = 0;
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

                //var homeStage = this.createStage();
                var home = new Home(/*homeStage*/);

   
                //var stage = this.createStage(true);

                /*
                 for (var i = 0; i < 10; i++) {
                 //var stage = this.createStage();
                 var conscience = new Conscience(this);
                 var denizen = new Denizen(conscience, stage);
                 home.addChild(denizen);

                 }
                 */
                var speed = 0.5; 
                var stage = this.createStage(1000, 500, true);

                var conscience1 = new Conscience(this);
                var human1 = new Human(conscience1, stage,'denizen', speed);
                home.addChild(human1);

                human1.body.x = 0;
                human1.body.y = 0;

                var conscience2 = new Conscience(this);
                var human2 = new Human(conscience2, stage,'denizen', speed);
                home.addChild(human2);

                var idea = new Idea();
                idea.addItem(new Action('teleport', [200, 200]));
                idea.addItem(new Action('wait', [3000]));
                idea.addItem(new Action('teleport', [200, 0]));

                idea.addItem(new Action('interact', [
                    human1, new Action('interpret', [new Idea([
                        new Action('move', [200, 400])
                    ])])
                ]));

                human2.interpret(idea);
            }
        });
    }
)
;
