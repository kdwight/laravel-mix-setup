let mix = require('laravel-mix');

mix.js('src/js/app.js', '/js')
  .sass('src/css/app.scss', '/css')
  .options({ processCssUrls: false }) // CSS url() rewriting; https://laravel-mix.com/docs/6.0/url-rewriting
  .extract() // JS Code Splitting; https://laravel-mix.com/docs/6.0/extract
  .setPublicPath('public')
  .disableNotifications();

if (process.env.APP_ENV === "local") {
  // https://laravel-mix.com/docs/6.0/browsersync
  mix.browserSync({
    proxy: process.env.APP_URL,
    files: [
      'public/**/*.html',
      'public/css/**/*.css',
      'public/js/**/*.js'
    ],
    notify: false
  })
}

if (mix.inProduction()) {
  mix.version(); // Cache Busting; https://laravel-mix.com/docs/6.0/versioning
}