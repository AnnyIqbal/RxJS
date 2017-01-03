// rxjs quiz tutorial link 2. https://channel9.msdn.com/Shows/codechat/050

import Rx from 'rxjs/Rx';

//creating custom observable via the factory function, 
// whenever we create a custom observables we need to callthe next function to let the values be displayed

// const o = Rx.Observable.create(o => {
//     o.next(1);
//     o.next('a');
//     o.complete();
//     return () => {console.log('disposed')}
// });

// o.subscribe(x=> console.log(x));

var count = 0;
const o = Rx.Observable.create( o => {
    if(count++ < 2) {
        o.error(new Error()); // throw error if count++ < 2
    }
    o.next(42); //else next()
})
// o.catch(Observable.of(5)).subscribe(x => console.log(x)); // give error due to count is 0
o.retry(2).catch(Rx.Observable.of(5)).subscribe(x => console.log(x)); // execute next qk it retries twice so count++ becomes 3
