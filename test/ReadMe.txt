Sinon

Spy
Watch the function but you cannot change it

Stub
Stubs are like spies, except in that they replace the target function. They can also contain custom behavior, such as returning values or throwing exceptions. 
They can even automatically call any callback functions provided as parameters.
Stubs have a few common uses:
You can use them to replace problematic pieces of code
You can use them to trigger code paths that wouldn't otherwise trigger - such as error handling
You can use them to help test asynchronous code more easily
You can substitue the target function to simulate its behaviour (retuns values, throw exceptions, or call callbacks provided as params)

Mock
A mock is a mixture between a spy and a stub, so it implements the API of both of them. But what make mocks
different is that we can establish expectations on them. These expectations will be checked at the end of the test and
if the mock has not been used as expected our test will fail. Mocks should be used primarily when you would use a stub,
but need to verify << multiple more specific behaviors >> on it. Note that, with a mock, we define our expectations up front.
Normally, the expectations would come last in the form of an assert function call. With a mock, we define it directly on
the mocked function, and then only call verify in the end. Mocks can be overly specific/brittle.



 