module.exports = () => {
  return {
    postcssPlugin: 'postcss-will-change',
    Declaration: {
      'will-change': decl => {
        let already = decl.parent.some(i => {
          return i.type === 'decl' && i.prop === 'backface-visibility'
        })
        if (!already) {
          decl.cloneBefore({ prop: 'backface-visibility', value: 'hidden' })
        }
      }
    }
  }
}
module.exports.postcss = true
