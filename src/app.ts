// import { Observable } from 'rxjs/';
// import Rx from 'rxjs/Rx';

//step 02: filter
// const source = Observable.fromEvent(document, 'click')
//     .filter( function(x: MouseEvent) {
//         return x.clientX > window.innerWidth / 2; // returns the clientX values greater than half of window's innerwidth
//     })
//     .take(10)
//     .subscribe( 
//         function(x: MouseEvent){
//             console.log('x: ' + x.clientX + ', y: ' + x.clientY);
//     });

//step 03: create
// const source : Rx.Observable<string> = Observable.create(
//     function(x: Rx.Observer<string>) {
//         x.next('Abc');
//         x.next('Xyz');
//         x.next('Pqr');
//         x.complete();
// });

// source.subscribe(
//     x => {
//         console.log('Next : ' +x);
//     },
//     err => {
//         console.log(err);
//     },
//     function() {
//         console.log('Completed');
//     });

//step 04 : ajax ni smjh aya??

//step06: merge
// import Rx = require('rxjs/Rx');


// var a = Rx.Observable.interval(200).map(function(i: number) {
//     return 'A' + i;
// });
// var b = Rx.Observable.interval(100).map(function(i: number) {
//     return 'B' + i;
// });

// var m = Rx.Observable.merge(a, b)
//     .take(10)
//     .subscribe(x => { console.log(x);});

//step08: filter even: filters an observable according to condition
// import Rx = require('rxjs/Rx');

// var src = Rx.Observable.range(1,5)
//     .filter(function(val: number){
//         return val % 2 !== 0; // filter odd numbers in range of 1-5
//     })
//     .subscribe(x => console.log(x));

//step09: reduce :multiple values ko single value me convert krta hai
// import Rx = require('rxjs/Rx');

// const src = Rx.Observable.range(1,5)
//     .reduce((a: number, b: number) => {return a+b;})
//     .subscribe(x=> console.log(x));

// const source = Rx.Observable.from([1,2,3,4])
//     .reduce((a: number, b: number) => {return a+b;})
//     .subscribe(x=> console.log(x));

//step10: reduce average smjh ni arha??
import Rx = require('rxjs/Rx');

var range = Rx.Observable.range(0, 5)
    .reduce((prev, cur) => {
        return {
            sum: prev.sum + cur,
            count: prev.count + 1
        };
    }, { sum: 0, count: 0 })
    .map((o) => {
        return o.sum / o.count;
    })
    .subscribe((x) => {
        console.log('Average is: ', x);
    });