document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, interval, takeUntil, switchMap, tap, takeWhile, merge, startWith, take } = rxjs;

    const hoursInput = document.getElementById('hour');
    const minutesInput = document.getElementById('minute');
    const secondsInput = document.getElementById('second');

    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const renderTimer = document.getElementById('timer');

    const start$ = fromEvent(startButton, 'click');
    const pause$ = fromEvent(pauseButton, 'click');
    const reset$ = fromEvent(resetButton, 'click');

    // Flag to indicate whether state is paused or not
    let intervalSubscription;
    let pauseFlag = false;

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
                takeWhile(countdown => countdown <= totalSeconds),   // Finish at 1 second
                takeUntil(reset$), 

                // Tap into observable to perform side effects (logging and rendering) so that it does not affect the emitted values
                tap(countdown => {

                    // If state is not paused, render
                    if(!pauseFlag) {
                        const remainingSeconds = totalSeconds - countdown;

                        const displayHours = Math.floor(remainingSeconds / 3600);
                        const displayMinutes = Math.floor((remainingSeconds % 3600) / 60);
                        const displaySeconds = remainingSeconds % 60;

                        console.log(`${displayHours}H : ${displayMinutes}M : ${displaySeconds}S Countdown: ${countdown}`);
                        renderTimer.textContent = `${displayHours}H : ${displayMinutes}M : ${displaySeconds}S`;


                        // Check if the countdown reaches 0 and render "Timer finished"
                        if (countdown === totalSeconds) {
                            renderTimer.textContent = 'Timer finished';
                        }
                    } // end outer if

                }) // end tap
            );
        })
    // subscribe to the observable created by the switchMap
    ).subscribe({
        // Callback function invoked for each emitted countdown value
        next: (countdown) => {
            if (countdown === 0) {
                // If countdown finishes, resset pause flag
                pauseFlag = false;
            }
        },
        // Callback function invoked when observable is complete
        complete: () => {
            // When countdown completes, clear interval subscription
            intervalSubscription = undefined;
            
            // But this will not because it's not part of the observable pipeline...
            // tap(renderTimer.textContent = 'Timer finished')
        }
    });

    // If button/event is triggered...
    pause$.subscribe(() => {
        pauseFlag = !pauseFlag; // ...toggle
    });

    // If reset event is triggered...
    reset$.subscribe(() => {
        // If there is an active interval subscription, clear it
        if (intervalSubscription) {
            intervalSubscription.unsubscribe();
        }

        // Reset pause flag and clear render
        pauseFlag = false;
        renderTimer.textContent = '';
    });
});