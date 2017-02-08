module.exports = function(str, vars) {

	return str.replace(/\$\{([A-Za-z0-9]+)(:-(.*?))?\}/g, function(varStr, varName, _, defValue) {
		if (vars.hasOwnProperty(varName)) {
			return vars[varName];
		}
		if (defValue) {
			return defValue;
		}
		throw new Error('Unknown variable: ' + parts[1]);
	});
};
