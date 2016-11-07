# CraftCMS with Gulp and Foundation for Sites 6

This is just a starter that I am using to kickstart development:
- using SCSS and SCSS lint
- Browserify to load JS modules
- Syncy to copy twig templates

## Build requirements
- node.js
- bower
- gulp-scss-lint wants Ruby gem scss-lint

## Important
Do not forget to put directory `dist/public/craft/` into `dist/` when going live. That is, it __has to be__ above web root. After that change line 5 in `dist/public/index.php` into line 4.

## Todo
- Gulp tasks for production mode to uglify, minify, optimize images
