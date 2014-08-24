module.exports = {
  'preprocessor:react-jsx': ['factory', factory]
}

var reactTools = require('react-tools');

function factory(args, config, logger, helper) {
  return function(content, file, done) {
    // sometimes, it is better to just not change the file extension
    // if you have a process that do something like this:
    //
    // var component = require('./some/component.jsx');
    //
    // and you want to test your commonjs module, then it will be better
    // to not modify the file extension.
    //

    var cfg = config['react-jsx:preprocessor'] || {};
    if (!cfg.doNotChangeFileExt && file.originalPath.substr(-4) == '.jsx') {
      file.path = file.originalPath.slice(0, -1);
    }
    done(reactTools.transform(content))
  }
}
