// requirejs config
requirejs.config({
    baseUrl: '/',
    paths: {
        lib: 'game/lib',
        gma: 'game/js/gma',
        test: 'game/js/test',
        jquery: 'game/lib/jquery-proxy',
        myclass: 'game/lib/my.class.min',
        signals: 'game/lib/signals.min'
    }
});

var manifest = [
    {src: "/game/assets/runningGrant.png", id: "grant"},
    {src: "/game/assets/monsterAIdle.png", id: "human_idle"},
    {src: "/game/assets/monsterARun.png", id: "human_run"},
    {src: "/game/assets/cocina_sm.jpg", id: "cocina_sm"},
    {src: "/game/assets/living1.jpg", id: "room1"},
    {src: "/game/assets/living2.jpg", id: "room2"},
    {src: "/game/assets/living3.jpg", id: "room3"},
    {src: "/game/assets/messy-room-02-500x250.jpg", id: "room4"},
    {src: "/game/assets/light.png", id: "light"},
    {src: "/game/assets/Sprite_01_Padre.png", id: "father"},

    {src: "/game/assets/room/bano_sm.jpg", id: "banio_sm"},
    {src: "/game/assets/room/bano_sm_off.jpg", id: "banio_sm_off"},

    {src: "/game/assets/room/cuarto_sm.jpg", id: "cuarto_sm"},
    {src: "/game/assets/room/cuarto_sm_off.jpg", id: "cuarto_sm_off"},

    {src: "/game/assets/room/cocina_sm.jpg", id: "cocina_sm"},
    {src: "/game/assets/room/cocina_sm_off.jpg", id: "cocina_sm_off"},

    {src: "/game/assets/room/living_sm.jpg", id: "living_sm"},
    {src: "/game/assets/room/living_sm_off.jpg", id: "living_sm_off"}
];

var Resources = {
    loader: null
};

var preload = function () {
    console.log('main', '::', 'preload');
    var d = $.Deferred();

    require(['gma/Resource'], function (Resource) {
        Resource.loader = new createjs.LoadQueue();
        Resource.loader.installPlugin(createjs.Sound);
        Resource.loader.addEventListener('complete', function () {
            d.resolve();
        });

        if (manifest.length) {
            Resource.loader.loadManifest(manifest);
        } else {
            d.resolve();
        }
    });

    return d;
};


preload().then(
    function () {
        console.log('main', '::', 'init');

        var config = {};

        require(['gma/God'], function (God) {
            var god = new God(config);
            god.create();
        });
    }
);
