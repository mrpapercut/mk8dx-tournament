const mix = require('laravel-mix');

mix.setPublicPath('public');
// mix.setResourceRoot('public');

mix
    .ts('./src/index.ts', './public')
    .sass('./src/styles.scss', './public');
