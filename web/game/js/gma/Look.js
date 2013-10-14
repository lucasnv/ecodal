define([], function () {
    return function (sprites, gestures, defaultGesture) {
        return {
            sprites: sprites || {},
            gestures: gestures || {},
            defaultGesture: defaultGesture,

            getGesture: function (gestureName, direction) {
                if (!this.gestures[gestureName]) {
                    console.error('Entity', '::', 'gesture desconocida', gestureName);
                    return;
                }

                var gestureDef = this.gestures[gestureName];

                return _.findWhere(gestureDef, {direction: direction});
            }
        }
    }
});
