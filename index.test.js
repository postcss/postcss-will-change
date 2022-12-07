let { equal } = require('uvu/assert')
let { test } = require('uvu')
let postcss = require('postcss')

let plugin = require('./')

async function run(input, output) {
  let result = await postcss([plugin]).process(input, { from: undefined })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('adds 3D hacks', async () => {
  await run(
    'a{ will-change: transform; }',
    'a{ backface-visibility: hidden; will-change: transform; }'
  )
})

test('does not override existing properties', async () => {
  await run(
    'a{ backface-visibility: visible; will-change: transform; }',
    'a{ backface-visibility: visible; will-change: transform; }'
  )
})

test('does not get confused by other selectors', async () => {
  await run(
    'a{ backface-visibility: visible; } b { will-change: transform; }',
    'a{ backface-visibility: visible; } ' +
      'b { backface-visibility: hidden; will-change: transform; }'
  )
})

test.run()
