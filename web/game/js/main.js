// requirejs config
requirejs.config({
    baseUrl: '/',
    paths: {
        lib: 'game/lib',
        gma: 'game/js/gma',
        jquery: 'game/lib/jquery-proxy',
        myclass: 'game/lib/my.class.min'
    }
});

require(['gma/God'], function (God) {

    var god = new God();
    god.create();

});