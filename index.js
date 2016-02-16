var postcss = require('postcss');

module.exports = postcss.plugin('postcss-will-change', function () {
    return function (css) {
        css.walkDecls('will-change', function (decl) {
            // Find if a backface-visibility is already present
            var isBackfaceVisibilityPresent = false;
            decl.parent.walkDecls('backface-visibility', function () {
                isBackfaceVisibilityPresent = true;
            });

            if (isBackfaceVisibilityPresent) {
                return;
            }

            decl.cloneBefore({ prop: 'backface-visibility', value: 'hidden' });
        });
    };
});
