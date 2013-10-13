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

var manifest = [];
var queue;

var preload = function () {
    console.log('main', '::', 'preload');
    var d = $.Deferred();

    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener('loadComplete', function () {
        d.resolve();
    });

    if (manifest.length) {
        queue.loadManifest(manifest);
    } else {
        d.resolve();
    }

    return d.promise();
};

var init = function () {
    console.log('main', '::', 'init');

    require(['gma/God'], function (God) {
        var god = new God();
        god.create();
    });

    /*
     require(['test/test'], function () {

     });
     */
};

preload().then(init);