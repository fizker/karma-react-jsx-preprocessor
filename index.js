var reactTools = require('react-tools')

function createReactJsxPreprocessor(args, config, logger, helper) {
	return function(content, file, done) {
		if (file.originalPath.substr(-4) == '.jsx') {
			file.path = file.originalPath.slice(0, -1);
		}
		done(reactTools.transform(content));
	}
}


createReactJsxPreprocessor.$inject = ['args', 'config.reactJsxPreprocessor', 'logger', 'helper'];
module.exports = {
	'preprocessor:react-jsx': ['factory', createReactJsxPreprocessor]
};
