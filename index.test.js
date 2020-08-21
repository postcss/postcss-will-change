let postcss = require('postcss')

let plugin = require('./')

async function run (input, output) {
  let result = await postcss([plugin]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('adds 3D hacks', async () => {
  await run(
    'a{ will-change: transform; }',
    'a{ backface-visibility: hidden; will-change: transform; }'
  )
})

it('does not override existing properties', async () => {
  await run(
    'a{ backface-visibility: visible; will-change: transform; }',
    'a{ backface-visibility: visible; will-change: transform; }'
  )
})

it('does not get confused by other selectors', async () => {
  await run(
    'a{ backface-visibility: visible; } b { will-change: transform; }',
    'a{ backface-visibility: visible; } ' +
      'b { backface-visibility: hidden; will-change: transform; }'
  )
})
