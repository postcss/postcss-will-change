# PostCSS Will Change

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="https://postcss.org/logo-leftp.svg">

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

<a href="https://evilmartians.com/?utm_source=postcss-will-change">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-will-change
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-will-change'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
