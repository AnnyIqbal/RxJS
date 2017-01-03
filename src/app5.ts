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
/*
import Rx = require('rxjs/Rx');

var src = Rx.Observable.range(1,5)
    .filter(function(val: number){
        return val % 2 !== 0; // filter odd numbers in range of 1-5
    })
    .subscribe(x => console.log(x));
*/
//step09: reduce :multiple values ko single value me convert krta hai
/*
import Rx = require('rxjs/Rx');

const src = Rx.Observable.range(1,5)
    .reduce((a: number, b: number) => {return a+b;})
    .subscribe(x=> console.log(x));

const source = Rx.Observable.from([1,2,3,4])
    .reduce((a: number, b: number) => {return a+b;})
    .subscribe(x=> console.log(x));
*/
//step10: reduce (syntax: "reduce(accumulator, [seed])" where, seed is the initial value and accumulator is the function)
// (explanation k lie chk this link: http://reactivex.io/documentation/operators/reduce.html)
/*
import Rx = require('rxjs/Rx');

var range = Rx.Observable.range(0, 5)
    .reduce((prev, cur) => { // prev = value returned by the reduce function itself, cur = sequential emitted values by observable
        return { // object that is passed again as parameter 'prev'
            sum: prev.sum + cur,
            count: prev.count + 1
        };
    }, { sum: 0, count: 0 })
    .map((o) => {
        return o.sum/o.count; // 10/5 = 2
    })
    .subscribe((x) => {
        console.log('Average is: ', x); //2 returned by map
        // console.log('count: '+x.count); // 5: 0-4
        // console.log('sum: '+ x.sum); // 10 : 0+1+2+3+4 
    });
*/

// step 11: scan (reduce ki trha hi accumulation krta hai mgr ye har intermediate result ko emit krte hue final result tk jata hai)
// description: apply a function to each item emitted by an Observable, sequentially, and emit each successive value
/*
import Rx = require('rxjs/Rx');

var avg = Rx.Observable.interval(1000)
    .take(10)
    .scan((prev, cur) => {
        return {
            sum: prev.sum + cur,
            count: prev.count + 1
        };
    }, { sum: 0, count: 0 })
    .map((o) => {
        return o.sum/o.count;
    })
    .subscribe(
        x => {
            console.log(x);
        },
        err => {
            console.log(err);
        },
        complete => {
            console.log('completed!');
        });

// map se ye hojaengi values
// Object {sum: 0, count: 1} = 0
// Object {sum: 1, count: 2} = 0.5
// Object {sum: 3, count: 3} = 1
// Object {sum: 6, count: 4} = 1.5
// Object {sum: 10, count: 5} = 2
// Object {sum: 15, count: 6} = 2.5
// Object {sum: 21, count: 7} = 3
// Object {sum: 28, count: 8} = 3.5
// Object {sum: 36, count: 9} = 4
// Object {sum: 45, count: 10} = 4.5

*/

//step 12: subject
// acts both as an observer and as an Observable. Because it is an observer, it can subscribe to one or more Observables, and 
// because it is an Observable, it can pass through the items it observes by reemitting them, and it can also emit new items.

import Rx from 'rxjs/Rx';
//A Subject allows us to push and pull values to the underlying Observable.
const simpleStream$ = new Rx.Subject<string>();

simpleStream$.subscribe((value) => {  
   console.log("firstObservable: " + value);
});

simpleStream$.next("a");
simpleStream$.next("b");

simpleStream$.subscribe((value) => {  
   console.log("secondObservable: " + value);
});

simpleStream$.next("c");

simpleStream$.subscribe((value) => {  
   console.log("thirdObservable: " + value);
});

simpleStream$.next("d");

// Each notification is broadcasted to all subscribed observers 
// thats why, last 2 lines (c and d) are being displayed 2 times each time for a subscription

/*
const subject = new Rx.Subject();

var s = subject.subscribe(
    x => {
        console.log(x);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed');
    });

subject.next(1);
subject.complete();
*/

// step 13: behavior subject
//When an observer subscribes to a BehaviorSubject, it begins by emitting the item most recently emitted by the source Observable(or a 
//seed/default value if none has yet been emitted) and then continues to emit any other items emitted later by the source Observable(s).
/*
import Rx = require('rxjs/Rx');

const simpleStream$ = new Rx.BehaviorSubject<string>("z");

simpleStream$.subscribe((value) => {  
   console.log("firstObserver: " + value);
});

simpleStream$.next("a");
simpleStream$.next("b");


simpleStream$.subscribe((value) => {  
   console.log("secondObserver: " + value);
});

simpleStream$.next("c");
simpleStream$.next("d");
*/

// step 14: replay subject
// ReplaySubject emits to any observer all of the items that were emitted by the source Observable(s), regardless of when the observer subscribes.
/*
import Rx = require('rxjs/Rx');

const simpleStream$ = new Rx.ReplaySubject<string>(2);

simpleStream$.subscribe((value) => {  
   console.log("firstObserver: " + value);
});

simpleStream$.next("a");
simpleStream$.next("b");
// simpleStream$.complete(); //yhn complete krdene se iske bad k c or d ni chalenge

simpleStream$.subscribe((value) => {  
   console.log("secondObserver: " + value);
});

simpleStream$.next("c");
simpleStream$.next("d");

*/

//step 15: publish subject
//The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.
// (If the source Observable does not emit any values, the AsyncSubject also completes without emitting any values.)
/*
import Rx = require('rxjs/Rx');

const simpleStream$ = new Rx.AsyncSubject<string>();

simpleStream$.subscribe((value) => {  
   console.log("firstObserver: " + value);
});

simpleStream$.next("a");
simpleStream$.next("b");

simpleStream$.subscribe((value) => {  
   console.log("secondObserver: " + value);
});

simpleStream$.next("c");
simpleStream$.next("d");

simpleStream$.complete(); //comment this out and no event will be sent as it won't be completed
*/