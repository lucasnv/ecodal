JS.packages(function () {
    with (this) {
        file('/game/js/classes/God.js')
            .provides('Game.God')
    }
});

JS.require('Game.God', function(God) {
    console.log('Tengo God', God);
});
