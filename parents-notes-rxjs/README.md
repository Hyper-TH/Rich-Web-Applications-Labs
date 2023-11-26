<b>Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern? What are streams useful for modelling and when might you use them in Rich Web development? </b>

Stream abstraction is a representation of data flowing over the course of the runttime. The relationship between streams and observer pattern is that the observers get notified when new information/data is being emitted in the stream/flow.

Streams are useful for modeling and handling asynchronous aspects of Rich Web Development.

In the case of Rich Web Development, streams can be beneficial in several aspects of development, some examples include:

UI events such as clicks, keyboard inputs, load unload, etc. Streams can be implemented to handle these events.

Streams can handle data flow when CRUD operations are being invoked (such as rendering real-time updates to the UI).

<b> Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJs library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides? </b>

The RxJS library can be used to handle the stream(s) of data that's coming back from the API responses through creating observables. These observables can represent asynchronous operations such as sending requests and/or posting through the API.

Operators can also be used to extract data (such as the map operator) or to handle errors (e.g., catchError).

Benefits to using a streams library such as RxJS for networking could include the following:

Declarative: Observables can be used to handle asynchronous operations in a declarative way (e.g., no step-by-step implications are required). This allows more readable and easier to maintain code, without having to manage call-backs and/or (nested) promises.

Complex data flows: Systems that require complex data flows where multiple asynchronous operations are being executed, observables can be used to implement a more organized structure of use cases.

Consistency: Using observables for network responses can maintain consistency throughout the codebase. Developers involved would only need to understand one paradigm.

Handling memory leaks: Stream libraries allow easy cancellation of subscriptions, this increases efficiency and reduces the chances of memory leaks.

Downsides of using a streams library:

Learning curve: Using a streams library has a learning curve, meaning developers new to reactive programming might find difficulty in learning it initially.

Complexity: In certain usecases of simple and smaller projects, using the concept of streams and observables could be an overkill and impose unneeded complexity required for the system.

Debugging and flow of operations: In managing operations, the order matters. This could be challenging for developers who have only started learning reactive programming.

<b> Consider three asynchronous tasks, A, B, & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this? </b>

Consequences could include the following:

Race conditions: If the asynchronous tasks share a global state, race conditions can occur where two or more tasks try to perform on the same state that could result in unexpected behaviour and corrupted data.

Inconsistency: Asynchronous tasks performing on the same state can result in data inconsistency. An example could be where a task/number of tasks is performing operations on the shared data, and the final state of the data may be unexpected/unintended.

Debugging and maintenance: Debugging and maintenance could be challenging as asynchronous tasks share on a global state. In the case scenario of a system growing, sharing on a global state could lead to unexpected sequence of events further more leading to unexpected behaviour. 

Good practice to alleviate any problems:

Scoping and encapsulation: Avoid declaring variables in a global scope, instead declare them within the only required methods/scope. Furthermore, encapsulation of states ensures the unexpected behaviour of modifcations on states from external components.

Implementation through testing and debugging: By performing unit testing and integration tests, this ensures the integrity of the operation flows/asynchronous tasks. Unit testing allows developers to see if components can produce the expected results on its own, and integration tests allows developers to see for any potential issues when different components start to integrate with each other. 

Immutable data: Instead of modifying existing objects, creating instances and applying the desired changes on them prevents unexpected behaviour and/or changes on existing objects.