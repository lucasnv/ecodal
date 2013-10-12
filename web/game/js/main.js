JS.Packages(function () {
    with (this) {
        file('/game/js/classes/God.js')
            .requires('JS.Class')
            .provides('God');
    }
});

JS.require('God', function(God) {
    console.log(God == '');
    console.log('Tengo God', God);
});
