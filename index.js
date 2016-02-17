var postcss = require('postcss');

module.exports = postcss.plugin('postcss-will-change', function () {
    return function (css) {
        css.walkDecls('will-change', function (decl) {
            var already = decl.parent.some(function (i) {
                return i.type === 'decl' && i.prop === 'backface-visibility';
            });
            if ( already ) return;
            decl.cloneBefore({ prop: 'backface-visibility', value: 'hidden' });
        });
    };
});
