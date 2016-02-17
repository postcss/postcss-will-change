import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output) {
    t.same(postcss([ plugin ]).process(input).css, output);
}

test('adds 3D hacks', t => {
    run(t, 'a{ will-change: transform; }',
           'a{ backface-visibility: hidden; will-change: transform; }');
});

test('does not override existing properties', t => {
    run(t, 'a{ backface-visibility: visible; will-change: transform; }',
           'a{ backface-visibility: visible; will-change: transform; }');
});

test('does not get confused by other selectors', t => {
    let input  = 'a{ backface-visibility: visible; } ' +
                 'b { will-change: transform; }';
    let output = 'a{ backface-visibility: visible; } ' +
                 'b { backface-visibility: hidden; will-change: transform; }';
    run(t, input, output);
});
