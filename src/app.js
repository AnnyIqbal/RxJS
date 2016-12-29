import $ from 'jquery';
import Rx from 'rxjs/Rx';
/*
// OBSERVABLES FROM SCRATCH

const a$ = new Rx.Observable(observer => {
    console.log("first value");
    observer.next('abc');
    observer.next('xyz');

    observer.error(new Error('Something went wrong!'));

    setTimeout(function(){
        observer.next('hello world');
        observer.complete();
    }, 3000);
});

a$
.catch(err => Rx.Observable.of(err))
.subscribe(
    v => {
        console.log(v);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed');
});
*/

// OBSERVABLES FROM PROMISE

