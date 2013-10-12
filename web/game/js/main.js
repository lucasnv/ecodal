JS.packages(function () {
    with (this) {
        file('/game/js/classes/God.js')
            .requires('JS.Class')
            .requires('Denizen')
            .requires('Conscience')
            .provides('God');

        file('/game/js/classes/Conscience.js')
            .requires('JS.Class')
            .provides('Conscience');

        file('/game/js/classes/Entity.js')
            .requires('JS.Class')
            .provides('Existant');

        file('/game/js/classes/Denizen.js')
            .requires('Existant')
            .provides('Denizen');
    }
});

JS.require('God', function (God) {
    var aGod = new God({
        "children": [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5}
        ]
    });

    aGod.create();
});
