/*var manifest = [
    {src: "/audio/bienvenida.mp3", id: "au-bienvenida"}
];

var Resources = {
    loader: null
};


        loader = new createjs.LoadQueue();
        loader.installPlugin(createjs.Sound);
        loader.addEventListener('complete', function () {
            console.log('COMPLETO');
            d.resolve();
        });

        if (manifest.length) {
            loader.loadManifest(manifest);
        }

*

 createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, this));
 createjs.Sound.registerSound("/audio/bienvenida.mp3", "au-bienvenida");

 function loadHandler(event) {
     // This is fired for each sound that is registered.
     var instance = createjs.Sound.play("au-bienvenida");  // play using id.  Could also use full sourcepath or event.src.
    // instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
     instance.volume = 0.5;
 }

/*

$(document).ready(function () {
    $(window).resize(function () {

    });
});
*/

 /**
 * Crea una intancia de sonido
 */
function createInstance(id){
    var instance = createjs.Sound.createInstance(id);
    return instance;
}

/**
 * Crea una intancia de sonido
 */
function soundPlay(instance, volume){
    instance.setVolume(volume);
    instance.play();
}
/**
 * Stop de sonido
 */
function soundStop(instance){
    instance.stop();
}

/**
 * Pausa de sonidos
 */
function soundPause(instance){
    instance.pause();
} 