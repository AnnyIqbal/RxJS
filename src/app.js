import $ from 'jquery';
import Rx from 'rxjs/Rx';

// OBSERVABLES FROM ARRAY 

const numbers = [01, 12, 23, 34, 45, 56, 67, 78, 89, 90];

const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
    v => {
        console.log(v);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log("Completed");
    }
);