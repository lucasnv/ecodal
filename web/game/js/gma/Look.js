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

                console.log('gestures', this.gestures);
                console.log('def', gestureDef);

                var g = _.findWhere(gestureDef, {direction: direction});

                console.log('g', g);

                if (!g) {
                    console.error('Entity', '::', 'no se ha definido el sprite:', g.sprite)
                }

                return g;
            }
        }
    }
});
