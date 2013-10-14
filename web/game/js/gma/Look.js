define([], function () {
    return function (sprites, gestures, defaultGesture) {
        this.sprites = sprites || {};
        this.gestures = gestures || {};
        this.defaultGesture = defaultGesture;
    }
});
