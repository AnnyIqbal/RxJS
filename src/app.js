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

// OBSERVABLES FROM A PROMISE, i.e. a promise represents the eventual results of an async operation

const myPromise = new Promise((resolve, reject) => {
    console.log("Creating Promise");
    setTimeout(()=>{
        resolve('Hello world');
    }, 2000);
});
/*
myPromise.then(x => {
    console.log(x);
});
*/
// use this promise as an Observable
/*
const promise$ = Rx.Observable.fromPromise(myPromise);
promise$.subscribe(
    x => {
        console.log(x);
    }
);
*/

function getUser(username) {
    return $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'jsonp'
    }).promise();
}


const input$ = Rx.Observable.fromEvent($('#input'), 'keyup');
input$.subscribe( e => {
    Rx.Observable.fromPromise(getUser(e.target.value))
    .subscribe(x=> {
        console.log(x);
        $('#name').text(x.data.name);
        $('#url').text(x.data.url);
        $('#repos').text("Public Repos: " + x.data.public_repos);
    });
});
    //46:.. yhn error ni hai mgr thek kam b ni krha chk it kal