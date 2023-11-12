document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, interval, takeUntil,
            switchMapTo, scan, startWith,
            mapTo} = rxjs;

    // Get buttons and where to render the timer
    const startButton = document.querySelector('#start');
    const stopButton = document.querySelector('#stop');
    const render = document.querySelector('timer');

    // Get inputs
    const inputHours = document.querySelector('#hour');
    const inputMinutes = document.querySelector('#minute');
    const inputSeconds = document.querySelector('#second');

    // Create observers (streams from click events)
    const start$ = fromEvent(startButton, 'click');
    const stop$ = fromEvent(stopButton, 'click');

    // Get the input values and parse it into INT
    const getInitialTime = () => {
        const hours = parseInt(inputHours.value) || 0;
        const minutes = parseInt(inputMinutes.value) || 0;
        const seconds = parseInt(inputSeconds.value) || 0;

        return (hours * 3600) + (minutes * 60) + seconds;
    };

    // Main observer
    const countDown$ = start$.pipe(
        switchMapTo(() => interval(1000)),  
        takeUntil(stop$),
        startWith(getInitialTime()),
        scan((acc) => acc - 1),
        mapTo((count) => count >= 0 ? count : 0)
    );

    // Subscribe to countDown stream
    countDown$.subscribe((count) => {
        const hours = Math.floor(count / 3600);
        const minutes = Math.floor((count % 3600) / 60);
        const seconds = count % 60;

        render.textContent = `${hours}H : ${minutes}M : ${seconds}S`;

        if (count === 0) {
            render.textContent = `Finished countdown`;
        };
    });
});