var postcss = require('postcss');

module.exports = postcss.plugin('postcss-will-change', function () {
    return function (css) {
        css.eachDecl('will-change', function (decl) {
            decl.cloneBefore({ prop: 'backface-visibility', value: 'hidden' });
        });
    };
});
