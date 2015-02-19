module.exports = function (css) {
    css.eachDecl('will-change', function (decl) {
        decl.cloneBefore({ prop: 'backface-visibility', value: 'hidden' });
    });
};
