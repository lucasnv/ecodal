define(
    ['myclass',
        'gma/World',
        'gma/Home',
        'gma/Scene',
        'gma/Conscience',
        'gma/entity/Denizen',
        'gma/entity/denizen/Human',
        'gma/home/Room',
        'gma/Idea',
        'gma/Action',
        'gma/Look',
        'gma/Resource'
    ],
    function (my, World, Home, Scene, Conscience, Denizen, Human, Room, Idea, Action, Look, Resource) {
        "use strict";

        return my.Class({

            constructor: function (config) {
                /* Attr*/
                this.container = '#gma_container';
                this.config = config;
                this.stageCount = 0;
                this.speedHuman = 0.5;

                // Temporal para probar
                this.rooms = [];
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

                var roomStage = this.createStage(1000, 500, false);

                this.rooms.push(this.createRoom('room1', 0, 0, roomStage));
                this.rooms.push(this.createRoom('room2', 500, 0, roomStage));
                this.rooms.push(this.createRoom('room3', 0, 250, roomStage));
                this.rooms.push(this.createRoom('room4', 500, 250, roomStage));

                var home = new Home(/*homeStage*/);
                this.createHuman(3, this.speedHuman, home);
            },

            // Temporal para probar
            getEmptyRoom: function (denizen) {
                var emptyRoom = null;

                // Buscar rooms vacios
                var emptyRooms = _.filter(this.rooms, function (room) {
                    return room.denizen == undefined;
                });

                // Buscar un room al azar entre los vacions
                if (emptyRooms.length > 0) {
                    var tmp = _.sample(emptyRooms, 1);
                    emptyRoom = tmp[0];

                    // Librerar los rooms previamente ocupados por el denizen
                    _.each(this.rooms, function (room) {
                        if (room.denizen == denizen) {
                            room.denizen = undefined;
                        }
                    });

                    // Marcar el room como ocupado por el denizen
                    emptyRoom.denizen = denizen;
                }

                return emptyRoom;
            },

            clearRoom: function (denizen) {
                _.each(this.rooms, function (room) {
                    if (room.denizen == denizen) {
                        room.denizen = undefined;
                    }
                });
            },

            createRoom: function (resourceName, x, y, stage) {
                var spriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult(resourceName)],
                    "frames": {width: 500, height: 250, regX: 0, regY: 0},
                    "animations": {"idle": [0]}
                });

                var look = new Look({
                    idle: new createjs.Sprite(spriteSheet, 'idle')
                }, {
                    idle: [
                        {
                            direction: 90,
                            sprite: 'idle',
                            animation: 'idle'
                        }
                    ]
                }, 'idle');

                var room = new Room(stage, look);
                room.body.x = x;
                room.body.y = y;
                room.gesture('idle');
                room.render();

                return room;
            },

            createHuman: function (cant, speed, source) {
                var stage = this.createStage(1000, 500, true);
                var conscience = null;
                var human = null;

                for (var i = 0; i < cant; ++i) {

                    /*
                     var walkSpriteSheet = new createjs.SpriteSheet({
                     "images": [Resource.loader.getResult("human_run")],
                     "frames": {width: 64, height: 64, regX: 32, regY: 32},
                     "animations": {"walk": [0, 9, "walk"]}
                     });

                     createjs.SpriteSheetUtils.addFlippedFrames(walkSpriteSheet, true, false, false);

                     var idleSpriteSheet = new createjs.SpriteSheet({
                     "images": [Resource.loader.getResult("human_idle")],
                     "frames": {width: 64, height: 64, regX: 32, regY: 32},
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
                     */

                    var data = new createjs.SpriteSheet({
                        "images": [Resource.loader.getResult("grant")],
                        "frames": {"regX": 82, "height": 292, "count": 64, "regY": 192, "width": 165},
                        "animations": {
                            "idle": [8, 9, "idle"],
                            "walk": [0, 25, "walk"],
                            "action": [26, 63, "idle", 2]
                        }
                    });

                    createjs.SpriteSheetUtils.addFlippedFrames(data, true, false, false);

                    var grant = new createjs.Sprite(data, "run");
                    grant.setTransform(-200, 90, 0.8, 0.8);
                    grant.framerate = 30;

                    var look = new Look({
                        grant: grant
                    }, {
                        idle: [
                            {
                                direction: 90,
                                sprite: 'grant',
                                animation: 'idle'
                            },
                            {
                                direction: -90,
                                sprite: 'grant',
                                animation: 'idle_h'
                            }
                        ],
                        walk: [
                            {
                                direction: 90,
                                sprite: 'grant',
                                animation: 'walk'
                            },
                            {
                                direction: -90,
                                sprite: 'grant',
                                animation: 'walk_h'
                            }
                        ],
                        action: [
                            {
                                direction: 90,
                                sprite: 'grant',
                                animation: 'action'
                            },
                            {
                                direction: -90,
                                sprite: 'grant',
                                animation: 'action_h'
                            }
                        ]
                    }, 'idle');

                    var conscience = new Conscience(this);
                    var human = new Human(conscience, stage, look, speed);
                    source.addChild(human);
                }
            }

        });
    }
)
;
