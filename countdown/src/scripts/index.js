document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, interval, takeUntil, map, switchMap, tap } = rxjs;

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const renderTimer = document.getElementById('timer');
    const inputSeconds = document.getElementById('second');
    
    const start$ = fromEvent(startButton, 'click');
    const stop$ = fromEvent(stopButton, 'click');

    // Switch to new observable when start is clicked
    start$.pipe(
        switchMap(() => {
            const seconds = parseInt(inputSeconds.value) || 0;  // Get initial seconds
            let currentSecond = seconds;                        // Initialize a var to keep track

            // Create interval observable, decrementing...
            return interval(1000).pipe(
                takeUntil(stop$),   // ...until the stop button is clicked
                map(() => --currentSecond), // Map each interval tick to the decremented second
                tap(countdown => console.log(countdown))    
            );
        })
    ).subscribe(result => {
        const displaySeconds = result % 60; // Calculate remaining seconds...
        renderTimer.textContent = `Result: ${displaySeconds}S`; // ...then update the UI

        // When countdown finishes
        if (result === 0) {
            renderTimer.textContent = 'Countdown finished';
        }
    });
});


