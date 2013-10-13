define(['test/B'], function (B) {
    console.log('B', B);

    var b1 = new B();
    var b2 = new B();

    b1.foo = 'Hola';

    console.log('b1', b1, b1.foo);
    console.log('b2', b2, b2.foo);
});
