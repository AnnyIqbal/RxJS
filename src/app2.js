import $ from 'jquery';
import Rx from 'rxjs/Rx';

// OBSERVABLES FROM ARRAY 
/*
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

// OBSERVABLES FROM ARRAY OF OBJECTS

const posts = [
    {title: 'Post One', body: 'This is the body'},
    {title: 'Post Two', body: 'This is the body'},
    {title: 'Post Three', body: 'This is the body'},
    {title: 'Post Four', body: 'This is the body'},
    {title: 'Post Five', body: 'This is the body'}
];
const postOutput = $('#v');
const post$ = Rx.Observable.from(posts);

post$.subscribe(
    v => {
        console.log(v);
        // $('#v').append('<li><h3>'+ v.title +'</h3><p>'+ v.body +'</p></li>');
        postOutput.append('<li><h3>'+ v.title +'</h3><p>'+ v.body +'</p></li>');
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log("Completed");
    }
);

// OBSERVABLES FROM A SET

const set = new Set([123, 'Anny', true, null, undefined, [1,2,3], {name: 'My Name', city: 'My City', gender: 'female'}]);

const set$ = Rx.Observable.from(set);

set$.subscribe(
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
*/
// OBSERVABLES FROM A MAP, i.e. an array of key-value pairs

const map = new Map([[1,2], ['s','e'], [true,false],[null, undefined]]);

const map$ = Rx.Observable.from(map);

map$.subscribe(
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
