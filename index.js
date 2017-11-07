module.exports = (f) => {
	var matchedES = f.toString().match(/function \(\{(.+)\}\) \{/);
	var matchedBabel = f.toString().match(/_ref\.(.+)(,|;)/g);
	var params = {};
	var allParamNames;
	var helper = function helper(args) {
		params = Object.assign(params, args);
		var newParamNames = Object.keys(params).sort();
		if (allParamNames.join('') === newParamNames.join('')) {
			return f(params);
		}
		return helper;
	};
	if (matchedES) {
		allParamNames = matchedES.split(', ');
	} else if (matchedBabel) {
		allParamNames = matchedBabel.map((x) => x.slice(5).slice(0, -1));
	} else {
		throw new Error('Use desctructive assignment of first argument for named parameters');
	}
	allParamNames.sort();
	return helper;
};
