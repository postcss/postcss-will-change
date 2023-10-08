module.exports = () => {
  return {
    Declaration: {
      'will-change': decl => {
        let already = decl.parent.some(i => {
          return i.type === 'decl' && i.prop === 'backface-visibility'
        })
        if (!already) {
          decl.cloneBefore({ prop: 'backface-visibility', value: 'hidden' })
        }
      }
    },
    postcssPlugin: 'postcss-will-change'
  }
}
module.exports.postcss = true
