var reactTools = require('react-tools')

function createReactJsxPreprocessor(args, config, logger, helper) {

	config = config || {}
	var transformPath = config.transformPath || function(path) {
		return path.replace( /\.jsx$/,'.js')
	}
	return function(content, file, done) {
		file.path = transformPath(file.originalPath)
		done(reactTools.transform(content))
	}
}

createReactJsxPreprocessor.$inject = ['args', 'config.reactJsxPreprocessor', 'logger', 'helper']

module.exports =
{ 'preprocessor:react-jsx': ['factory', createReactJsxPreprocessor]
}
