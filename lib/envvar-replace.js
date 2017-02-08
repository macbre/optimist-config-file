module.exports = function(str, vars) {

	return str.replace(/\$?\$\{([A-Za-z0-9]+)(:-(.*?))?\}/g, function(varStr, varName, _, defValue) {
		// Handle escaping:
		if (varStr.indexOf('$$') === 0) {
			return varStr;
		}
		// Handle simple variable replacement:
		if (vars.hasOwnProperty(varName)) {
			return vars[varName];
		}
		// Handle default values:
		if (defValue) {
			return defValue;
		}
		throw new Error('Unknown variable: ' + varName);
	});
};
