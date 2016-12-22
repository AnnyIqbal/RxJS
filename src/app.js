import $ from 'jquery';
import Rx from 'rxjs/Rx';

const button = $('#button');
const btnStream$ = Rx.Observable.fromEvent(button, 'click');

btnStream$.subscribe(
    function(e) {
        console.log("event");
    },
    function(err) {
        console.log(err);
    },
    function() {
        console.log("Completed!");
    }
);