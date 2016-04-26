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

test('fail with no params', t => {
	t.throws(() => bindable(() => {}));
});
