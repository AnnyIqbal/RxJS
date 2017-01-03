import $ from 'jquery';
import Rx from 'Rxjs/Rx';

// OPERATORS

// 1. INTERVALS: returns an observable sequence that produces a value after each period
/*
const source$ = Rx.Observable.interval(100)  // produce the value after the specified interval, i.e. 500ms this will go on forever
    .take(5); // take will only produce 5 values
source$.subscribe(x=> {
    console.log(x);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log("completed!");
    });
*/
// 2. TIMER: emits 1 particular item after the specified span of TIMER
/*
// it'll after after the time given as first value and wait for the time given as 2nd value and use that time as the period b/w next then next values
const source$ = Rx.Observable.timer(5000, 1000)  // start after 5sec then after 1sec next value then after 2 sec next val and so on
    .take(5); // take will only produce 5 values
source$.subscribe(x=> {
    console.log(x);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log("completed!");
    });
*/

// 3. RANGE: emitted at once from the start value and emits second value times, i.e. (5, 10) means start at 5 and emit 10 times => 5 to 14
/*
const source$ = Rx.Observable.range(5, 10)  // start at 0 and go 5 values up

source$.subscribe(x=> {
    console.log(x);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log("completed!");
    });
*/
// 4. MAP: appliea a function to each item thats emitted by the source observable &
//  returns returns an observable that emits the result of that function
// we can have as many maps ona n observable as we want
/*
const source$ = Rx.Observable.interval(1000)
    .take(10)
    .map( v => v*2 );

source$.subscribe(x => console.log(x));
*/
/*
const source$ = Rx.Observable.from(['Anny', 'Zeeshan', 'Sadaf', 'Salman'])
    .map(v => v.toUpperCase())
    .map(v => 'I am '+v); // v can be any other variable

source$.subscribe(x => console.log(x));
*/
/*
function getUser(username) {
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'jsonp'
    }).promise();
}
 Rx.Observable.fromPromise(getUser('AnnyIqbal'))
    .map(user => user.data.name)
    .subscribe(x=> {
        console.log(x);
    });
*/

// 5. PLUCK: simpler version of map
/*
const users = [
    {name: 'A', age: 10},
    {name: 'B', age: 20},
    {name: 'C', age: 15}
];

const user$ = Rx.Observable.from(users)
    .pluck('age')
    .subscribe(x => console.log(x));

// user$.subscribe(x => console.log(x)); //alternatively
*/

// 6. MERGE: allows us to merge two or more observables. dono sath sath
/*
Rx.Observable.of('Hello') // of operator converts whatever is passed to it into an observable
    .merge(Rx.Observable.of('Everyone'))
    .subscribe( x=> console.log(x));
*/
/*
Rx.Observable.interval(2000)
    .merge(Rx.Observable.interval(500))
    .take(25)
    .subscribe(x => console.log(x));
*/
/*
const source1$ = Rx.Observable.interval(2000).map(v => 'Merge1: '+v);
const source2$ = Rx.Observable.interval(500).map(v => 'Merge2: '+v);

Rx.Observable.merge(source1$, source2$)
    .take(25)
    .subscribe(x => console.log(x));
*/
// 7. CONCAT: allows us to concat observables, one after another
/*
const source1$ = Rx.Observable.range(0, 5).map(v => 'Source1: '+v);
const source2$ = Rx.Observable.range(6, 5).map(v => 'Source2: '+v);

Rx.Observable.concat(source1$, source2$)
    .subscribe(
        x => {
            console.log(x);
        },
        err => {
            console.log(err);
        },
        complete => {
            console.log('completed');
    });
*/

// 8. MERGE MAP: 
/*
Rx.Observable.of('Hello')
    .subscribe(x => {
        Rx.Observable.of( x + ' Everyone')
            .subscribe(x => console.log(x));
    })
*/ 
// this is the correct method to do it
/*
Rx.Observable.of('Hello')
    .mergeMap(v => {
        return Rx.Observable.of( v + ' Everyone')
    }).subscribe( x => console.log(x));
*/
// 9. SWITCH MAP: transforms the items that are emitted by an observable into observables and then flatens the emissions into a single observable
// also called flat maps in rxjs floor
/*
function getUser(username) {
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'jsonp'
    }).promise();
}

// const input$ = Rx.Observable.fromEvent($('#input'), 'keyup');

// input$.subscribe( e => {
//     Rx.Observable.fromPromise(getUser(e.target.value))
//     .subscribe(x=> {
//         $('#name').text(x.data.name);
//         $('#url').text(x.data.url);
//         $('#repos').text("Public Repos: " + x.data.public_repos);
//     });
// });

// correct way to do it, double subscriptions are not good

const input$ = Rx.Observable.fromEvent($('#input'), 'keyup')
    .map(e => e.target.value)
    .switchMap(v => {
        return Rx.Observable.fromPromise(getUser(v));
    })
    .subscribe(x => {
        $('#name').text(x.data.name);
        $('#url').text(x.data.url);
        $('#repos').text("Public Repos: " + x.data.public_repos);
    });
*/