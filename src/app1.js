import $ from 'jquery';
import Rx from 'rxjs/Rx';

// OBSERVABLES FROM EVENTS 

const button = $('#button');

const btnStream$ = Rx.Observable.fromEvent(button, 'click');

btnStream$.subscribe(
    function(e) {
        console.log(e);
        console.log(e.target.innerHTML); // innerHTML of button tags
    },
    function(err) {
        console.log(err);
    },
    function() {
        console.log("Completed!");
    }
);

const input = $('#input');
const div = $('#div');

const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');

inputStream$.subscribe(
    function(e) {
        // console.log(e);
        console.log(e.target.value); // the value we type in the input box
        // console.log(e.currentTarget.value); // the value we type in the input box
        div.append(e.target.value); // appends the div to render the typed chars as in 2way data binding of angular2
    },
    function(err) {
        console.log(err);
    },
    function() {
        console.log("Completed");
    }
);

const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');

moveStream$.subscribe(
    function(e) {
        // console.log(e);
        console.log(e.target.value); 
        div.append('X: ' + e.clientX + 'Y: ' + e.clientY); // appends the x and y coordinates of the mouse movements
        div.html('<h1> X: ' + e.clientX + ' Y: ' + e.clientY); // rewrites the x n y coordinates
    },
    function(err) {
        console.log(err);
    },
    function() {
        console.log("Completed");
    }
);
