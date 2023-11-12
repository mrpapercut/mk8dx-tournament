const mix = require('laravel-mix');

mix
    .ts('./src/index.ts', 'public')
    .sass('./src/styles.scss', 'public');
