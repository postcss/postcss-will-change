var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output) {
    expect(postcss(plugin).process(input).css).to.eql(output);
};

describe('postcss-will-change', function () {

    it('adds 3D hacks', function () {
        test('a{ will-change: transform; }',
             'a{ backface-visibility: hidden; will-change: transform; }');
    });

    it('does not override existing properties', function () {
        test('a{ backface-visibility: visible; will-change: transform; }',
             'a{ backface-visibility: visible; will-change: transform; }');
    });

    it('does not get confused by other selectors', function () {
        var source = 'a{ backface-visibility: visible; } ' +
          '.foo { will-change: transform; }';
        var expected = 'a{ backface-visibility: visible; } ' +
          '.foo { backface-visibility: hidden; will-change: transform; }';
        test(source, expected);
    });

});
