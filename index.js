var shallowEquals = require('shallow-equals');

module.exports = (f) => {
	var matchedES6 = f.toString().match(/function \(\{(.+)\}\) \{/);
	var matchedBabel = f.toString().match(/_ref\.(.+);/g);
	var params = {};
	var paramNames;
	var helper = function helper(args) {
		params = Object.assign(params, args);
		if (shallowEquals(paramNames.sort(), Object.keys(params).sort())) {
			return f(params);
		}
		return helper;
	};
	if (matchedES6) {
		paramNames = matchedES6.split(', ');
	} else if (matchedBabel) {
		paramNames = matchedBabel.map((x) => x.slice(5).slice(0, -1));
	} else {
		throw new Error('Use desctructive assignment of first argument for named parameters');
	}
	return helper;
};
