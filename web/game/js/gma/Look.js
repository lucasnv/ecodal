define([], function () {
    return function (sprites, gestures, defaultGesture) {
        return {
            sprites: sprites || {},
            gestures: gestures || {},
            defaultGesture: defaultGesture
        }
    }
});
