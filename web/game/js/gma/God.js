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
                this.speedHuman = 0.2;
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

                var home = new Home(/*homeStage*/);
                this.createHuman(1, 'denizen', this.speedHuman, home);

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

            createHuman : function(cant, look, speed, source){

                var stage = this.createStage(1000, 500, true);
                var conscience = null;
                var human = null;

                for( var i = 0; i < cant ; ++i ){
                    conscience = new Conscience(this);
                    human = new Human(conscience, stage, look, speed);
                    source.addChild(human);
                }                
            }

        });
    }
)
;
