// requirejs config
requirejs.config({
    baseUrl: '/',
    paths: {
        lib: 'game/lib',
        gma: 'game/js/gma',
        test: 'game/js/test',
        jquery: 'game/lib/jquery-proxy',
        myclass: 'game/lib/my.class.min',
        signals: 'game/lib/signals.min',
        pathfinding: 'game/lib/pathfinding/pathfinding-browser'
    }
});

var manifest = [
    {src: "/game/assets/light.png", id: "light"},
    // Denizen
    {src: "/game/assets/denizen/padre.png", id: "father"},

    // Room
    {src: "/game/assets/room/bano_sm.jpg", id: "banio_sm"},
    {src: "/game/assets/room/bano_sm_off.jpg", id: "banio_sm_off"},

    {src: "/game/assets/room/cuarto_sm.jpg", id: "cuarto_sm"},
    {src: "/game/assets/room/cuarto_sm_off.jpg", id: "cuarto_sm_off"},

    {src: "/game/assets/room/cocina_sm.jpg", id: "cocina_sm"},
    {src: "/game/assets/room/cocina_sm_off.jpg", id: "cocina_sm_off"},

    {src: "/game/assets/room/living_sm.jpg", id: "living_sm"},
    {src: "/game/assets/room/living_sm_off.jpg", id: "living_sm_off"},

    {src: "/game/assets/activity/icon_light.png", id: "icon_light"},
    {src: "/game/assets/activity/light.png", id: "light"},
    {src: "/game/assets/activity/light_super.png", id: "light_super"},

    {src: "/game/assets/activity/icon_faucet.png", id: "icon_faucet"},
    {src: "/game/assets/activity/faucet.png", id: "faucet"}
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


preload().done(
    function () {
        console.log('main', '::', 'init');

        var config = {};

        require(['gma/God'], function (God) {
            var god = new God(config);
            god.create();
        });
    }
);
