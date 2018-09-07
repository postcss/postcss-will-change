var postcss = require('postcss')

var plugin = require('./')

function run (input, output) {
  return postcss([plugin]).process(input, { from: undefined })
    .then(function (result) {
      expect(result.css).toEqual(output)
      expect(result.warnings()).toHaveLength(0)
    })
}

it('adds 3D hacks', function () {
  return run(
    'a{ will-change: transform; }',
    'a{ backface-visibility: hidden; will-change: transform; }'
  )
})

it('does not override existing properties', function () {
  return run(
    'a{ backface-visibility: visible; will-change: transform; }',
    'a{ backface-visibility: visible; will-change: transform; }'
  )
})

it('does not get confused by other selectors', function () {
  var input = 'a{ backface-visibility: visible; } ' +
              'b { will-change: transform; }'
  var output = 'a{ backface-visibility: visible; } ' +
               'b { backface-visibility: hidden; will-change: transform; }'
  return run(input, output)
})
