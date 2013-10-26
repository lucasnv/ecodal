define(
    ['myclass',
        'gma/World',
        'gma/Home',
        'gma/Scene',
        'gma/Conscience',
        'gma/entity/Denizen',
        'gma/entity/denizen/Human',
        'gma/home/Room',
        'gma/home/room/Bathroom',
        'gma/home/room/Bedroom',
        'gma/home/room/Kitchen',
        'gma/home/room/Livingroom',
        'gma/Idea',
        'gma/Action',
        'gma/Look',
        'gma/Resource',
        'gma/User',
        'pathfinding',
        'gma/activity/Light',
        'gma/activity/Faucet'
    ],
    function (my, World, Home, Scene, Conscience, Denizen, Human, Room, Bathroom, Bedroom, Kitchen, Livingroom, Idea, Action, Look, Resource, User, PF, LightActivity, FaucetActivity) {
        "use strict";

        return my.Class({

            constructor: function (config) {
                /* Attr*/
                console.log('God', '::', 'config', config);
                this.stage = null;
                this.container = '#gma_container';
                this.config = config;
                this.stageCount = 0;
                this.speedHuman = 0.15;

                this.roomWidth = 360;
                this.roomHeight = 270;
                this.roomPadding = 50;

                this.floorOffset = -10;

                this.dialogIconWidth = 50;
                this.dialogIconHeight = 50;
                this.dialogIconMargin = 10;
                this.dialogPadding = 10;

                this.denizens = [];
                this.rooms = [];

                this.roomConnections = [];

                this.worldMatrix = [];

                this.dialogs = [];

                this.sound = {
                    ambient: createjs.Sound.createInstance('snd_ambient'),
                    music: createjs.Sound.createInstance('snd_music'),
                    pop: createjs.Sound.createInstance('snd_pop')
                };

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
                this.sound.music.volume = 0.3;
                this.sound.music.play({loop: -1});

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

                var bathroom = this.createRoom('banio_sm', 0, 0, Bathroom);
                bathroom.addActivity(new FaucetActivity('faucet', {
                    position: {
                        x: 220,
                        y: 210
                    },
                    gesture: 'action',
                    time: 700
                }));

                var bedroom = this.createRoom('cuarto_sm', this.roomWidth, 0, Bedroom);

                var kitchen = this.createRoom('cocina_sm', 0, this.roomHeight, Kitchen);
                kitchen.addActivity(new FaucetActivity('faucet', {
                    position: {
                        x: 145,
                        y: this.roomHeight + 245
                    },
                    gesture: 'action',
                    time: 700
                }));

                var livingroom = this.createRoom('living_sm', this.roomWidth, this.roomHeight, Livingroom);


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
                        x: bedroom.getPosition().x + 37,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset,
                        z: 0
                    },
                    {
                        x: bedroom.getPosition().x + 37,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset - 60,
                        z: 0
                    },
                    {
                        x: bedroom.getPosition().x + 37,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset - 60,
                        z: 1
                    },
                    {
                        x: livingroom.getPosition().x + 37,
                        y: livingroom.getPosition().y + this.roomHeight + this.floorOffset,
                        z: 1
                    }
                ]);

                livingroom.addConnection(bedroom, [
                    {
                        x: livingroom.getPosition().x + 37,
                        y: livingroom.getPosition().y + this.roomHeight + this.floorOffset,
                        z: 1
                    },
                    {
                        x: bedroom.getPosition().x + 37,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset - 60,
                        z: 1
                    },
                    {
                        x: bedroom.getPosition().x + 37,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset - 60,
                        z: 0
                    },
                    {
                        x: bedroom.getPosition().x + 37,
                        y: bedroom.getPosition().y + this.roomHeight + this.floorOffset,
                        z: 0
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

                var fatherSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult("father")],
                    "frames": {width: 108, height: 152, regX: 54, regY: 152, count: 19},
                    "animations": {
                        "walk": [7, 13, true, 0.5],
                        "idle": [10],
                        "action": [14, 17, "action"]
                    }
                });
                var fatherSprite = new createjs.Sprite(fatherSpriteSheet, "idle");
                var fatherLook = new Look({
                    father: fatherSprite
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

                var kidSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult("kid")],
                    "frames": {width: 72, height: 100, regX: 36, regY: 100, count: 22},
                    "animations": {
                        "walk": [10, 19, true, 0.5],
                        "idle": [14],
                        "action": [20, 21, true, 0.8]
                    }
                });
                var kidSprite = new createjs.Sprite(kidSpriteSheet, "idle");
                var kidLook = new Look({
                    kid: kidSprite
                }, {
                    idle: [
                        {
                            direction: 90,
                            sprite: 'kid',
                            animation: 'idle'
                        },
                        {
                            direction: -90,
                            sprite: 'kid',
                            animation: 'idle'
                        }
                    ],
                    walk: [
                        {
                            direction: 90,
                            sprite: 'kid',
                            animation: 'walk'
                        },
                        {
                            direction: -90,
                            sprite: 'kid',
                            animation: 'walk'
                        }
                    ],
                    action: [
                        {
                            direction: 90,
                            sprite: 'kid',
                            animation: 'action'
                        },
                        {
                            direction: -90,
                            sprite: 'kid',
                            animation: 'action'
                        }
                    ]
                }, 'idle');

                var motherSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult("mother")],
                    "frames": {width: 107, height: 150, regX: 54, regY: 150, count: 21},
                    "animations": {
                        "walk": [7, 13, true, 0.5],
                        "idle": [10],
                        "action": [17, 19, true, 0.8]
                    }
                });
                var motherSprite = new createjs.Sprite(motherSpriteSheet, "idle");
                var motherLook = new Look({
                    mother: motherSprite
                }, {
                    idle: [
                        {
                            direction: 90,
                            sprite: 'mother',
                            animation: 'idle'
                        },
                        {
                            direction: -90,
                            sprite: 'mother',
                            animation: 'idle'
                        }
                    ],
                    walk: [
                        {
                            direction: 90,
                            sprite: 'mother',
                            animation: 'walk'
                        },
                        {
                            direction: -90,
                            sprite: 'mother',
                            animation: 'walk'
                        }
                    ],
                    action: [
                        {
                            direction: 90,
                            sprite: 'mother',
                            animation: 'action'
                        },
                        {
                            direction: -90,
                            sprite: 'mother',
                            animation: 'action'
                        }
                    ]
                }, 'idle');

                var padre = this.createHuman(this.speedHuman, fatherLook);
                padre.setPosition(this.getRoomCenter(livingroom));
                padre.think();
                this.denizens.push(padre);

                var mother = this.createHuman(this.speedHuman, motherLook);
                mother.setPosition(this.getRoomCenter(bathroom));
                mother.think();
                this.denizens.push(mother);

                var kid = this.createHuman(this.speedHuman, kidLook);
                kid.setPosition(this.getRoomCenter(bedroom));
                kid.think();
                this.denizens.push(kid);

                var self = this;
                this.stage.on('drawstart', function () {
                    _.each(self.denizens, function (denizen) {
                        var room = self.getRoomByDenizen(denizen);
                        if (room) {
                            self.occupyRoom(room, denizen);
                        }
                    });
                });
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
                    coordinates.push(this.getRoomCenter(room2));
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

            getAvailableActivities: function (denizen) {
                var activities = [];

                var freeRooms = this.getRoomsWithoutDenizen(denizen);

                _.each(freeRooms, function (room) {
                    activities = activities.concat(room.getAvailableActivities());
                });

                return activities;
            },

            // Temporal para probar
            getEmptyRoom: function (denizen) {
                var emptyRoom = null;

                // Buscar rooms vacios
                var emptyRooms = this.getRoomsWithoutDenizen(denizen);

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

            getRoomByDenizen: function (denizen) {
                var pos = denizen.getPosition();

                return this.getRoomByCoordinates(pos.x, pos.y);
            },

            getRoomsWithoutDenizen: function (denizen) {
                return _.filter(this.rooms, function (room) {
                    return !_.contains(room.denizens, denizen);
                });
            },

            getRoomCenter: function (room) {
                var pos = room.getPosition();

                return {
                    x: pos.x + this.roomPadding + Math.round(Math.random() * (this.roomWidth - 2 * this.roomPadding)),
                    y: pos.y + this.roomHeight + this.floorOffset,
                    z: 0
                }
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

            createRoom: function (resourceName, x, y, Class) {
                var self = this;

                var spriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult(resourceName)],
                    "frames": {width: this.roomWidth, height: this.roomHeight, regX: 0, regY: 0},
                    "animations": {
                        "idle": 0
                    }
                });

                var offSpriteSheet = new createjs.SpriteSheet({
                    "images": [Resource.loader.getResult(resourceName + '_off')],
                    "frames": {width: this.roomWidth, height: this.roomHeight, regX: 0, regY: 0},
                    "animations": {
                        "off": 0
                    }
                });

                var look = new Look({
                    idle: new createjs.Sprite(spriteSheet, 'idle'),
                    off: new createjs.Sprite(offSpriteSheet, 'off')
                }, {
                    idle: [
                        {
                            direction: 90,
                            sprite: 'idle',
                            animation: 'idle'
                        }
                    ],
                    off: [
                        {
                            direction: 90,
                            sprite: 'off',
                            animation: 'off'
                        }
                    ]
                }, 'off');

                var room = new Class(this.stage, look);
                room.setPosition({x: x, y: y});
                room.gesture('off');

                room.addActivity(new LightActivity('light'));

                /*
                 room.body.addEventListener('click', function (event) {
                 _.each(self.denizens, function (denizen) {
                 var currentRoom = self.getRoomByCoordinates(denizen.getPosition().x, denizen.getPosition().y);

                 var coordinates = self.findPath(currentRoom, room);

                 var actions = [];

                 _.each(coordinates, function (coord) {
                 actions.push(new Action('move', [coord.x, coord.y]));
                 });

                 var idea = new Idea(actions);

                 denizen.halt();
                 denizen.interpret(idea);
                 });
                 }, true);
                 */

                return room;
            },

            openDialog: function (denizen) {
                var self = this;

                var d = $.Deferred();

                this.closeDialog(denizen);

                var room = this.getRoomByDenizen(denizen);

                if (!room) {
                    d.reject();
                    return d;
                }

                var activities = room.getActivities();

                var dialog = new createjs.Container();

                _.each(activities, function (activity, index) {
                    var icon = new createjs.Bitmap(Resource.loader.getResult(activity.icon));
                    icon.name = activity.name;
                    icon.x = self.dialogPadding + (self.dialogIconWidth * index + self.dialogIconMargin * index);
                    icon.y = self.dialogPadding;

                    icon.on('click', function () {
                        self.closeDialog(denizen);
                        d.resolve(activity);
                    });

                    dialog.addChild(icon);
                });

                var iconCount = activities.length;

                var _w = this.dialogPadding * 2 + iconCount * this.dialogIconWidth + (iconCount - 1) * this.dialogIconMargin;
                var _h = this.dialogPadding * 2 + this.dialogIconHeight;

                var background = new createjs.Shape();

                background.graphics.beginFill('#ffffff').drawRoundRect(0, 0, _w, _h, 10);

                dialog.addChildAt(background, 0);

                this.dialogs.push({
                    dialog: dialog,
                    denizen: denizen
                });

                this.stage.addChild(dialog);

                var pos = denizen.getPosition();
                var denizenBounds = denizen.body.getBounds();
                var dialogBounds = dialog.getBounds();

                dialog.x = pos.x - this.dialogPadding - (Math.round(dialogBounds.width * 0.5));
                dialog.y = pos.y - denizenBounds.height - dialogBounds.height - (2 * this.dialogPadding);

                this.sound.pop.play();

                return d;
            },

            closeDialog: function (denizen) {
                var dialog = _.findWhere(this.dialogs, {denizen: denizen});

                if (dialog) {
                    this.stage.removeChild(dialog.dialog);

                    var index = this.dialogs.indexOf(dialog);

                    if (index > -1) {
                        this.dialogs.splice(index, 1);
                    }
                }
            },

            createHuman: function (speed, look) {
                var self = this;

                var conscience = new Conscience(this);
                var human = new Human(conscience, this.stage, look, speed);

                human.body.addEventListener('mousedown', function (evt) {
                    var body = evt.currentTarget;
                    body.offset = {x: body.x - evt.stageX, y: body.y - evt.stageY};
                    var denizen = body.entity;
                    denizen.halt();

                    self.closeDialog(denizen);

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

                        denizen.excecute(new Idea(actions)).done(function () {
                            denizen.halt();

                            var d = self.openDialog(denizen);

                            d.done(function (activity) {
                                denizen.excecute(denizen.conscience.getActivityIdea(activity)).then(
                                    function () {
                                        denizen.think();
                                    }
                                );
                            });

                            d.fail(function () {
                                denizen.think();
                            });

                        });
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
