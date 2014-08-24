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

			// configuring the preprocessor
			'react-jsx:preprocessor' : {
		        // by default the preprocessor will change the 
		        // extension of the files from .jsx to .js.
		        // This might be an issue in some situations.
		        // Use this property to avoid the file to be renamed
		        doNotChangeFileExt: true // default is false, change to true to prevent file extension change.
		    }
		})
	}
