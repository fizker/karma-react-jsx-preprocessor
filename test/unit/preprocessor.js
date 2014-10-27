describe('unit/preprocessor.js', function() {
	var module = require('../../index')
	var reactTools = require('react-tools')

	beforeEach(function() {
		fzkes.fake(reactTools, 'transform')
	})
	afterEach(function() {
		fzkes.restore()
	})

	describe('When requiring the module', function() {
		it('should return a preprocessor function', function() {
			module.should.have.property('preprocessor:react-jsx').be.an('array')
				.and.have.length(2)
			var preprocessor = module['preprocessor:react-jsx']
			preprocessor[0].should.equal('factory')
			preprocessor[1].should.be.a('function')
		})
		it('should take four arguments', function() {
			var factory = module['preprocessor:react-jsx'][1]
			factory.should.have.length(4)
		})
	})
	describe('When calling the factory', function() {
		var factory
		var result
		beforeEach(function() {
			factory = module['preprocessor:react-jsx'][1]
			result = factory()
		})
		it('should return another function taking 3 arguments', function() {
			result.should.be.a('function')
			result.should.have.length(3)
		})
		describe('and calling the result', function() {
			var callback
			var file
			beforeEach(function() {
				file =
					{ path: 'abc.jsx'
					, originalPath: 'abc.jsx'
					}
				reactTools.transform.returns('transformed content')
				callback = fzkes.fake('callback')
				result('content', file, callback)
			})
			it('should call the react transformer', function() {
				reactTools.transform.should.have.been.calledWith('content')
			})
			it('should call the callback with the transformed content', function() {
				callback.should.have.been.calledWith('transformed content')
			})

			describe('the file path', function(){
				it('should be renamed by an optional transformPath function', function() {
					result = factory(null, {
						transformPath: function(fileName) {
							return fileName.replace(/.jsx$/, '.jsx.js')
						}
					})
					result('content', file, callback)
					file.path
					  .should.equal('abc.jsx.js')
				})
				it('should by default be renamed from .jsx to .js ', function() {
					file.path
						.should.equal('abc.js')
				})
				it('should by default keep .js file extension', function() {
					file =
						{ path: 'abc.js'
						, originalPath: 'abc.js'
						}
					reactTools.transform.returns('transformed content')
					callback = fzkes.fake('callback')
					result('content', file, callback)
					file.path
						.should.equal('abc.js')
				})
			})
		})
	})
})
