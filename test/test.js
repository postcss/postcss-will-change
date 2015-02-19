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

});
