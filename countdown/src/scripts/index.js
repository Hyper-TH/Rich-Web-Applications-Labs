document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, interval, takeUntil, switchMap, tap } = rxjs;

    const minutesInput = document.getElementById('minute');
    const secondsInput = document.getElementById('second');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const renderTimer = document.getElementById('timer');

    const start$ = fromEvent(startButton, 'click');
    const stop$ = fromEvent(stopButton, 'click');

    // Combine minutes and seconds observables
    start$.pipe(
        switchMap(() => {
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;

            return interval(1000).pipe(
                takeUntil(stop$),
                takeUntil(start$),
                tap(countdown => {
                    const totalSeconds = minutes * 60 + seconds - countdown;
                    const displayMinutes = Math.floor(totalSeconds / 60);
                    const displaySeconds = totalSeconds % 60;

                    console.log(`${displayMinutes}M : ${displaySeconds}S Countdown: ${countdown}`);
                    renderTimer.textContent = `${displayMinutes}M : ${displaySeconds}S Countdown: ${countdown}`;
                })
            );
        })
    ).subscribe();
});