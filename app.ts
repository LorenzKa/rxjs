// setTimeout(() => {
//     console.log('3');
//     setTimeout(() => {
//         console.log('2');
//         setTimeout(() => {
//             console.log('1');
//             setTimeout(() => {
//                 console.log('0');
//             }, 1000)
//         }, 1000)
//     }, 1000)

// }, 1000)
// let counter = 3;
// let interval = setInterval(() => {
//     console.log(counter--)
//     if (counter === 0) clearInterval(interval);
// }, 1000)
import { interval, of, from } from "rxjs";
import { take, filter } from "rxjs/operators";
// of(3,2,1,0).subscribe(x => console.log(x));
// from([3,2,1,0]).subscribe(x => console.log(x));
console.log("Beginne Countdown")
interval(1000)
    .pipe(
        take(4),
        filter(x => x % 2 != 0))
    .subscribe(
        value => console.log(3 - value),
        null,
        () => console.log('complete')
    );