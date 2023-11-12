const mix = require('laravel-mix');

mix.setPublicPath('public');

mix
    .ts('./src/index.ts', './public')
    .sass('./src/styles.scss', './public')
    .copy('./images', './public/images');
