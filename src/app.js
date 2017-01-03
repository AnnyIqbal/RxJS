// rxjs quiz tutorial link 3. https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
import Rx from 'rxjs/Rx';
import jQuery from 'jquery/src/jquery.js';

//1.
/*
var requestStream = Rx.Observable.of('https://api.github.com/users')
    .subscribe(function(requestUrl) {
        var responseStream = Rx.Observable.create(function (observer) {
            jQuery.getJSON(requestUrl)
                .done(function(response) { observer.next(response); })
                .fail(function(jqXHR, status, error) { observer.error(error); })
                .always(function() { observer.complete(); });
            })
            .subscribe(function(response) {
                console.log(response);
            });
    });
*/
//IN 1. THE PROBLEM IS THAT WE CAN'T NEST SUBSCRIBE CALLS, SO MOVED TO 2. I.E. USE map operator

//2.
/*
var requestStream = Rx.Observable.of('https://api.github.com/users')
  .map(function(requestUrl) {
     return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  })
  .subscribe(function(response) {
     console.log(response);
  });
*/
//IN 2. THE PROBLEM IS THAT WE'RE NOW GETTING PROMISE OF JSON OBJECTS BUT WE NEED THE JSON OBJECTS STREAM ONLY, SO MOVED TO 3. I.E. USE flatMap operator
//3.
//  is code ko copying with uncommented code 
// var requestStream = Rx.Observable.of('https://api.github.com/users')
//   .flatMap(requestUrl => {
//       return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
//   })
//   .subscribe(response => {
//       document.getElementById('div').innerHTML = ('ID: '+ response[0].id +'<br> URL: '+ response[0].url +'<br> TYPE: '+ response[0].type + '<br> AVATAR: ' + response[0].avatar_url);
//       for(var i=0; i<response.length; i++){
//         console.log(response[i].url);
//       }
//   });

//now we're creating a refresh button that everytime generates a stream whenever clicked
/*
var button = $('#click');
var refreshClickStream = Rx.Observable.fromEvent(button, 'click')
    .subscribe( x=> {
        console.log(x);
    });
*/
//Since the refresh click event doesn't itself carry any API URL, we need to map each click to an actual URL.
//Now we change the request stream to be the refresh click stream mapped to the API endpoint with a random offset parameter each time.
//4.
/*
var button = $('#click');
var refreshClickStream = Rx.Observable.fromEvent(button, 'click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  })
  .subscribe( x=> {
        console.log(x);
  });
*/
// PROBLEM NOW: A request doesn't happen anymore on startup, it happens only when the refresh is clicked. BUT I need both behaviors: a request when either a refresh is clicked or the webpage was just opened.
// 5.
/*
var button = $('#click');

var refreshClickStream = Rx.Observable.fromEvent(button, 'click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  })
  .subscribe( x=> {
        console.log(x);
  });

var startupRequestStream = Rx.Observable.of('https://api.github.com/users');
// but ab ik array of objects arha hai on startup or ik click p arha hai,PROBLEM: we need a single merged stream, so use merge operator

var requestStream = Rx.Observable.merge(
  refreshClickStream, startupRequestStream
);
*/
// 6. alternative n cleaner code way of merging is
/*
var button = $('#click');
var refreshClickStream = Rx.Observable.fromEvent(button, 'click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  })
  .merge(Rx.Observable.of('https://api.github.com/users'))
  .subscribe( x=> {
        console.log(x);
  });
*/
//7. more cleaner and readable code
/*
var button = $('#click');
var refreshClickStream = Rx.Observable.fromEvent(button, 'click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  })
    .startWith('https://api.github.com/users')
    .subscribe( x=> {
        console.log(x);
  });
*/
//8. even more better, use startWith(), lets see an example of it first
// startWith() function: No matter how your input stream looks like, the output stream resulting of startWith(x) will have x at the beginning. 
//example of startWith()
/*
var source = Rx.Observable.of('mbnnmkn10')
    .startWith('1, 2, 3')
    .subscribe( x => {
        console.log('Next: ' +x );
    },
    err => {
        console.log('Error: ' + err);
    },
    complete => {
        console.log('Completed');
    });
*/
//8.
var requestStream = Rx.Observable.of('https://api.github.com/users')
  .flatMap(requestUrl => {
      return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  })
  .subscribe(response => {
      document.getElementById('div').innerHTML = ('ID: '+ response[0].id +'<br> URL: '+ response[0].url +'<br> TYPE: '+ response[0].type + '<br> AVATAR: ' + response[0].avatar_url);
      for(var i=0; i<response.length; i++){
        console.log(response[i].url);
      }
  });

var button = $('#click');

var refreshClickStream = Rx.Observable.fromEvent(button, 'click')
  .startWith('kuch bhi likh do krwadia to map hai ye ni display hoga')
  .map(() => {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  })
  .subscribe( x=> {
        console.log(x);
  });

//PROBLEM: yahan p all responses are rendered and refresh p ++ horhe hn we need only 3 so we'll treat them separately for now
//9. nhi hora??

var suggestion1Stream = Rx.Observable.of('https://api.github.com/users')
  .map( listUsers => {
    // get one random user from the list
    console.log('listUsers: '+listUsers);
    return listUsers[Math.floor(Math.random()*listUsers.length)];
  })
  .subscribe(suggestion => {
  // render the 1st suggestion to the DOM
  console.log(suggestion);
});
