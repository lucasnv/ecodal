define(
    ['myclass',
        'gma/World',
        'gma/Home',
        'gma/Scene',
        'gma/Conscience',
        'gma/entity/Denizen',
        'gma/entity/denizen/Human',
        'gma/home/Room',
        'gma/home/room/Kitchen',
        'gma/Idea',
        'gma/Action',
        'gma/Look',
        'gma/Resource',
        'gma/User',
        'pathfinding'
    ],
    function (my, World, Home, Scene, Conscience, Denizen, Human, Room, Kitchen, Idea, Action, Look, Resource, User, PF) {
        "use strict";

        return my.Class({

            constructor: function (config) {
                /* Attr*/
                console.log(config);
                this.stage = null;
                this.container = '#gma_container';
                this.config = config;
                this.stageCount = 0;
                this.speedHuman = 0.2;

                this.roomWidth = 360;
                this.roomHeight = 270;

                this.floorOffset = -10;

                this.denizens = [];
                this.rooms = [];

                this.roomConnections = [];

                this.worldMatrix = [];

                this.init();
            },

            init: function () {
                this.stage = this.createStage(this.roomWidth * 2, this.roomHeight * 2, true);
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

                var user = new User(this.config.gender);
                user.create();
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
                //this.user.create(); 
                var home = new Home(/*homeStage*/);

                var bathroom = this.createRoom('banio_sm', 0, 0, home);
                var bedroom = this.createRoom('cuarto_sm', this.roomWidth, 0, home);
                var kitchen = this.createRoom('cocina_sm', 0, this.roomHeight, home);
                var livingroom = this.createRoom('living_sm', this.roomWidth, this.roomHeight, home);


                this.rooms.push(bathroom);
                this.rooms.push(bedroom);
                this.rooms.push(kitchen);
                this.rooms.push(livingroom);

                this.worldMatrix = [
                    [bathroom, bedroom],
                    [false, true],
                    [kitchen, livingroom]
                ];

                bathroom.addConnection(bedroom, {
                    x: bathroom.getPosition().x + this.roomWidth,
                    y: bathroom.getPosition().y + this.roomHeight + this.floorOffset
                });

                bedroom.addConnection(bathroom, {
                    x: bedroom.getPosition().x,
                    y: bedroom.getPosition().y + this.roomHeight + this.floorOffset
                });

                bedroom.addConnection(livingroom, [
                    {
                        x: bedroom.getPosition().x + 20,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset
                    },
                    {
                        x: bedroom.getPosition().x + 20,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset - 60
                    },
                    {
                        x: livingroom.getPosition().x + 20,
                        y: livingroom.getPosition().y + this.roomHeight + this.floorOffset
                    }
                ]);

                livingroom.addConnection(bedroom, [
                    {
                        x: livingroom.getPosition().x + 20,
                        y: livingroom.getPosition().y + this.roomHeight + this.floorOffset
                    },
                    {
                        x: bedroom.getPosition().x + 20,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset - 60
                    },
                    {
                        x: bedroom.getPosition().x + 20,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset
                    }
                ]);

                livingroom.addConnection(kitchen, {
                    x: livingroom.getPosition().x,
                    y: livingroom.getPosition().y + this.roomHeight + this.floorOffset
                });

                kitchen.addConnection(livingroom, {
                    x: kitchen.getPosition().x + this.roomWidth,
                    y: kitchen.getPosition().y + this.roomHeight + this.floorOffset
                });

                home.init();

                var padre = this.createHuman(this.speedHuman);
                padre.setPosition({x: 360, y: 260});
                this.denizens.push(padre);
            },

            findPath: function (room1, room2) {
                var self = this;

                var matrix = this.worldToMatrix();

                var room1Coord = this.roomToWorldCoordinates(room1);
                var room2Coord = this.roomToWorldCoordinates(room2);

                var grid = new PF.Grid(matrix[0].length, matrix.length, matrix);

                var finder = new PF.AStarFinder();

                var args = room1Coord.concat(room2Coord);
                args.push(grid);

                var path = finder.findPath.apply(finder, args);

                var rooms = [];

                _.each(path, function (coords) {
                    var tmp = self.worldMatrix[coords[1]][coords[0]];
                    if (tmp instanceof Room) {
                        rooms.push(tmp);
                    }
                });

                var coordinates = [];

                _.each(rooms, function (room, index) {
                    var nextRoom = rooms[index + 1];

                    if (nextRoom) {
                        var connection = room.getConnection(nextRoom);
                        var tmpCoords = _.isArray(connection.coordinates) ? connection.coordinates : [connection.coordinates];

                        coordinates = coordinates.concat(tmpCoords);
                    }
                });

                if (!_.isEmpty(coordinates)) {
                    coordinates.push({
                        x: room2.getPosition().x + Math.round(self.roomWidth * 0.5),
                        y: room2.getPosition().y + self.roomHeight + self.floorOffset
                    });
                }

                return coordinates;
            },

            worldToMatrix: function () {
                var matrix = [];

                _.each(this.worldMatrix, function (row) {
                    var parsedRow = [];
                    _.each(row, function (col) {
                        parsedRow.push(col !== false ? 0 : 1);
                    });

                    matrix.push(parsedRow);
                });

                return matrix;
            },

            roomToWorldCoordinates: function (room) {
                var roomRow = undefined;
                var roomCol = undefined;

                var rowCount = this.worldMatrix.length;

                for (var i = 0; i < rowCount; i++) {
                    var row = this.worldMatrix[i];

                    if (_.contains(row, room)) {
                        roomRow = i;
                        var colCount = row.length;

                        for (var j = 0; j < colCount; j++) {
                            if (row[j] == room) {
                                roomCol = j;
                                break;
                            }
                        }
                        break;
                    }
                }

                if (roomRow === undefined || roomCol === undefined) {
                    throw new Error('No se encontro el room en la matriz');
                }

                return [roomCol, roomRow];
            },

            getAvailableActivities: function () {
                var activities = [];

                _.each(this.rooms, function (room) {
                    activities = activities.concat(room.getAvailableActivities());
                });

                return activities;
            },

            // Temporal para probar
            getEmptyRoom: function (denizen) {
                var emptyRoom = null;

                // Buscar rooms vacios
                var emptyRooms = _.filter(this.rooms, function (room) {
                    return !_.contains(room.denizens, denizen);
                });

                // Buscar un room al azar entre los vacions
                if (emptyRooms.length > 0) {
                    var tmp = _.sample(emptyRooms, 1);
                    emptyRoom = tmp[0];

                    // Librerar los rooms previamente ocupados por el denizen
                    this.clearRoom(denizen);

                    // Marcar el room como ocupado por el denizen
                    this.occupyRoom(emptyRoom, denizen);
                }

                return emptyRoom;
            },

            getRoomByCoordinates: function (x, y) {
                var c = this.rooms.length;

                for (var i = 0; i < c; i++) {
                    var room = this.rooms[i];
                    var body = room.body;
                    var minX = body.x;
                    var maxX = body.x + this.roomWidth;
                    var minY = body.y;
                    var maxY = body.y + this.roomHeight;
                    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
                        return room;
                    }
                }

                return null;
            },

            occupyRoom: function (room, denizen) {
                this.clearRoom(denizen);
                room.denizens.push(denizen);
            },

            clearRoom: function (denizen) {
                _.each(this.rooms, function (room) {
                    var index = room.denizens.indexOf(denizen);
                    if (index > -1) {
                        room.denizens.splice(index, 1);
                    }
                });
            },

            createRoom: function (resourceName, x, y, home) {
                var self = this;

                var spriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult(resourceName)],
                    "frames": {width: this.roomWidth, height: this.roomHeight, regX: 0, regY: 0},
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

                var room = new Kitchen(this.stage, look);
                room.setPosition({x: x, y: y});
                room.gesture('idle');
                room.render();

                room.body.addEventListener('click', function (event) {
                    _.each(self.denizens, function (denizen) {
                        var currentRoom = self.getRoomByCoordinates(denizen.getPosition().x, denizen.getPosition().y);

                        var coordinates = self.findPath(currentRoom, room);

                        var actions = [];

                        _.each(coordinates, function (coord) {
                            actions.push(new Action('move', [coord.x, coord.y]));
                        });

                        var idea = new Idea(actions);

                        denizen.interpret(idea);
                    });
                }, true);

                home.addRooms(room);

                return room;
            },

            createHuman: function (speed) {
                var self = this;

                var fatherSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult("father")],
                    "frames": {width: 80, height: 155, regX: 40, regY: 155, count: 7},
                    "animations": {
                        "walk": [0, 6, true, 0.5],
                        "idle": [3],
                        "action": [4, 6, "idle"]
                    }
                });

                //createjs.SpriteSheetUtils.addFlippedFrames(fatherSpriteSheet, true, false, false);

                var father = new createjs.Sprite(fatherSpriteSheet, "idle");

                var look = new Look({
                    father: father
                }, {
                    idle: [
                        {
                            direction: 90,
                            sprite: 'father',
                            animation: 'idle'
                        },
                        {
                            direction: -90,
                            sprite: 'father',
                            animation: 'idle'
                        }
                    ],
                    walk: [
                        {
                            direction: 90,
                            sprite: 'father',
                            animation: 'walk'
                        },
                        {
                            direction: -90,
                            sprite: 'father',
                            animation: 'walk'
                        }
                    ],
                    action: [
                        {
                            direction: 90,
                            sprite: 'father',
                            animation: 'action'
                        },
                        {
                            direction: -90,
                            sprite: 'father',
                            animation: 'action'
                        }
                    ]
                }, 'idle');

                var conscience = new Conscience(this);
                var human = new Human(conscience, this.stage, look, speed);

                human.body.addEventListener('mousedown', function (evt) {
                    var body = evt.currentTarget;
                    body.offset = {x: body.x - evt.stageX, y: body.y - evt.stageY};
                    var denizen = body.entity;
                    denizen.halt();

                    self.clearRoom(denizen);
                });

                human.body.addEventListener('pressmove', function (evt) {
                    var body = evt.currentTarget;
                    body.x = evt.stageX + body.offset.x;
                    body.y = evt.stageY + body.offset.y;
                });

                human.body.addEventListener('pressup', function (evt) {
                    var body = evt.currentTarget;
                    var denizen = body.entity;

                    var room = self.getRoomByCoordinates(evt.stageX, evt.stageY);

                    if (room) {
                        self.occupyRoom(room, denizen);

                        var actions = [
                            new Action('fly', [
                                denizen.getPosition().x, room.getPosition().y + self.roomHeight + self.floorOffset
                            ])
                        ];
                        actions.push(new Action('halt'));

                        denizen.interpret(new Idea(actions));
                    } else {
                        console.error('El denizen no tiene donde carse muerto');
                    }
                });

                return human;
            }

        });
    }
)
;
