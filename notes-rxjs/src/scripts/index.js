document.addEventListener('DOMContentLoaded', () => {
    const { range, filter, map, Observable, fromEvent, interval } = rxjs;

    // interval observer
    const interval$ = interval(1000);

    interval$.subscribe(val => console.log(val));

});