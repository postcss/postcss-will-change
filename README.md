# PostCSS Will Change [![Build Status][ci-img]][ci]

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[PostCSS] plugin to insert 3D hack before [will-change] property.

This plugin uses `backface-visibility` to force the browser to create
a new layer, without overriding existing `backface-visibility` properties.
This 3D CSS hack is commonly done with `transform: translateZ(0)`,
but `backface-visibility` is used here to avoid overriding
the more popular `transform` property.

These hacks are required for browsers that do not support `will-change`.

Use this plugin only before [Autoprefixer]. It will add vendor prefixes
to `backface-visibility`.

[Autoprefixer]: https://github.com/postcss/autoprefixer
[will-change]:  https://dev.opera.com/articles/css-will-change-property/
[PostCSS]:      https://github.com/postcss/postcss
[ci-img]:       https://travis-ci.org/postcss/postcss-will-change.svg
[ci]:           https://travis-ci.org/postcss/postcss-will-change

```css
.foo {
    will-change: transform;
}
```

```css
.foo {
    backface-visibility: hidden;
    will-change: transform;
}
```

## Usage

```js
postcss([ require('postcss-will-change') ])
```

See [PostCSS] docs for examples for your environment.
