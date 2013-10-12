define(['myclass', 'signals', 'gma/Idea'], function (my, signals, Idea) {
    "use strict";

    var Conscience = my.Class({
        god: null,
        timeout: null,
        thought: new signals.Signal(),
        constructor: function (god) {
            console.log('Creando Conscience con god:', god);

            if (!god) {
                throw new Error('No puede haber Conscience sin god');
            }

            this.god = god;
        },
        think: function () {
            console.log('Conscience', 'think');
            var self = this;

            this.timeout = setTimeout(function () {
                var idea = new Idea();
                console.log('Conscience', 'generó la Idea:', idea);
                self.thought.dispatch(idea);
            }, 1000);
        }
    });

    return Conscience;
});