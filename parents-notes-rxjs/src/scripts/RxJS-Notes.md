# Observable (Producer)

<b>Definition</b>

A stream of data/events over time. This is used for handling asynchronous operations and event handling.

<b>Role</b>

Source of data and emits/produces values over time. 

# Observer (Consumer)

<b>Definition</b>

An object (or a set of callback functions) that subscribes to an observable to receive notifications of values or events when the observable emits data.

<b>Role</b>

Consumer of data emitted by the observable. Defines the actions to be taken (pipe functions) when the observable produces a new value.

# Subject

Type of observable that allows both values to be pushed into the observable stream and for subscribers to listen to the values being pushed.

Can act as both the observable and the observer.