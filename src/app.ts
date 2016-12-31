import { Observable } from 'rxjs/';
import Rx from 'rxjs/Rx';

// const source = Observable.fromEvent(document, 'click')
//     .filter( function(x: MouseEvent) {
//         return x.clientX > window.innerWidth / 2; // returns the clientX values greater than half of window's innerwidth
//     })
//     .take(10)
//     .subscribe( 
//         function(x: MouseEvent){
//             console.log('x: ' + x.clientX + ', y: ' + x.clientY);
//     });

const source : Rx.Observable<string> = Observable.create(
    function(x: Rx.Observer<string>) {
        x.next('Abc');
        x.next('Xyz');
        x.next('Pqr');
        x.complete();
});

source.subscribe(
    x => {
        console.log('Next : ' +x);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log('Completed');
    });