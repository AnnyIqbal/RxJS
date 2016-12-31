"use strict";
var _1 = require('rxjs/');
// const source = Observable.fromEvent(document, 'click')
//     .filter( function(x: MouseEvent) {
//         return x.clientX > window.innerWidth / 2; // returns the clientX values greater than half of window's innerwidth
//     })
//     .take(10)
//     .subscribe( 
//         function(x: MouseEvent){
//             console.log('x: ' + x.clientX + ', y: ' + x.clientY);
//     });
var source = _1.Observable.create(function (x) {
    x.next('Abc');
    x.next('Xyz');
    x.next('Pqr');
    x.complete();
});
source.subscribe(function (x) {
    console.log('Next : ' + x);
}, function (err) {
    console.log(err);
}, function (complete) {
    console.log('Completed');
});
