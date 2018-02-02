# [Partial Application](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch4.md) with Named Parameters [![Build Status](https://travis-ci.org/Hermanya/partial-application-with-named-parameters.svg?branch=master)](https://travis-ci.org/Hermanya/partial-application-with-named-parameters)

![screenshot](screenshot.png)

## Usage

First have a function, that destructs its first and only parameter.
This module will make you able to partially apply named parameters for that function.
[Take a look at tests](test.js) to for details.

```js
import test from 'ava';
import bindable from './';

test('calculate sum', t => {
	const reduce = bindable(function ({reducer, initialValue, array}) {
		return array.reduce(reducer, initialValue);
	});
	const reduceFromZero = reduce({initialValue: 0});
	const array = [1, 2, 3];

	t.is(reduceFromZero({
		reducer: (x, y) => x + y,
		array
	}), 6);
});
```

## License

MIT © [Herman Starikov](http://hermanya.github.io)
