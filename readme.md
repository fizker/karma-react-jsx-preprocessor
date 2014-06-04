karma-react-jsx-preprocessor
============================

A [karma preprocessor](http://karma-runner.github.io/) for compiling
[React JSX](http://facebook.github.io/react/) files.

Version 0.1.x should be compatible with the 0.10.x version of Karma.

How to use
----------

It is really simple: Add a preprocessor clause to the karma conf file, and it
will automatically transform the .jsx files.

	module.exports = function(config) {
		config.set({
			preprocessors: {
				'**/*.jsx': [ 'react-jsx' ]
			},

			// the rest of the config should be here
		})
	}
