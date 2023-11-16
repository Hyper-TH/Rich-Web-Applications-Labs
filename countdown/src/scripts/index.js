document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, interval, takeUntil, switchMap, tap, takeWhile, merge, startWith, take } = rxjs;

    const hoursInput = document.getElementById('hour');
    const minutesInput = document.getElementById('minute');
    const secondsInput = document.getElementById('second');

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const renderTimer = document.getElementById('timer');

    const start$ = fromEvent(startButton, 'click');
    const stop$ = fromEvent(stopButton, 'click');

    // Function to create an observable for rendering "Time finished"
    // TODO: SUBSCRIBE
    const createFinishedObservable$ = () => {
        return interval(1000).pipe(
            take(1), // Emit only one value after 1000ms
            tap(() => renderTimer.textContent = 'Time finished')
        );
    };

    // Switchmap to switch to a new observable when start is activated 
    start$.pipe(
        switchMap(() => {
            // Extract DOM values and convert them to integers (default to 0 if none)
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;

            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            
            // interval observer for countdown
            return interval(1000).pipe(
                takeUntil(stop$),   // takeUntil either button is clicked (TODO: these could be merged)
                takeUntil(start$),
                // Tap into observable to perform side effects (logging and rendering) so that it does not affect the values
                tap(countdown => {
                    const remainingSeconds = totalSeconds - countdown;

                    const displayHours = Math.floor(remainingSeconds / 3600);
                    const displayMinutes = Math.floor((remainingSeconds % 3600) / 60);
                    const displaySeconds = remainingSeconds % 60;

                    console.log(`${displayHours}H : ${displayMinutes}M : ${displaySeconds}S Countdown: ${countdown}`);
                    renderTimer.textContent = `${displayHours}H : ${displayMinutes}M : ${displaySeconds}S Countdown: ${countdown}`;
                })
            );
        })
    ).subscribe();  // subscribe to the observable created by the switchMap
});
