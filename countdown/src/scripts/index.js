document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, takeUntil, takeWhile, 
            scan, startWith, mapTo} = rxjs;

    // Get buttons and where to render the timer
    const startButton = document.querySelector('#start');
    const stopButton = document.querySelector('#stop');
    const renderTimer = document.querySelector('#timer');

    // Get inputs
    const inputHours = document.querySelector('#hour');
    const inputMinutes = document.querySelector('#minute');
    const inputSeconds = document.querySelector('#second');

    // Get the input values and parse it into INT
    const getInitialTime = () => {
        const hours = parseInt(inputHours.value) || 0;
        const minutes = parseInt(inputMinutes.value) || 0;
        const seconds = parseInt(inputSeconds.value) || 0;

        console.log(`Input: ${hours} : ${minutes} : ${seconds}`);

        return (hours * 3600) + (minutes * 60) + seconds;
    };
   
    // TODO: have it so that the times are subscribed to the other
    const render = (count) => {
        // Receive each emitted countdown value...
        const hours = Math.floor(count / 3600);
        const minutes = Math.floor((count % 3600) / 60);
        const seconds = count % 60;

        // .... then updates the UI
        renderTimer.textContent = `${hours}H : ${minutes}M : ${seconds}S`;
    };

    // Create observers (streams from click events)
    const start$ = fromEvent(startButton, 'click');
    const stop$ = fromEvent(stopButton, 'click');

    // start$.subscribe(() => alert('Hello'));
    // Main observer
    const $countdown = start$.pipe(
        mapTo(-1),     
        startWith(getInitialTime()),                
        scan((acc, value) => acc + value, getInitialTime()),    // acc accumulated result and value current value emitted by observable
        takeUntil(stop$),                              
        takeWhile(value => value >= 0)
    ).subscribe((value) => {
        console.log(`Countdown: ${value}`);
        render(value);

        if (value === 0) {
            renderTimer.textContent = `Finished countdown`;
        }
    });     

});