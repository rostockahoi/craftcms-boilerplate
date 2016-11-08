# CraftCMS with Gulp and Foundation for Sites 6

This is just a starter that I am using to kickstart development:
- using SCSS and SCSS lint
- Browserify to load JS modules
- Syncy to copy twig templates

## Build requirements
- node.js
- bower
- gulp-scss-lint wants Ruby gem scss-lint

## Getting started
1. Run `npm install && bower install` and meanwhile
2. Setup a database and change your credentials in `dist/public/craft/config/db.php`
3. Change Craft configuration in `dist/public/craft/config/general.php`
4. Download latest Craft Package from [Craft Website](https://craftcms.com/)
5. Copy over the missing `app/` folder
6. Check the [install section](https://craftcms.com/docs/installing) to set write permissions properly.
7. Point your dev server to `dist/public/` (I am using Vagrant and Scotchbox)
8. Hit `yourdomain.dev/admin`

If the last point not works try `yourdomain.dev/index.php?admin` and take a look at [Craft's Docs](https://craftcms.com/docs/config-settings#omitScriptNameInUrls). If your are using Apache you may have to configure it to allow overrides through `.htaccess` files.

## Important
Do not forget to put directory `dist/public/craft/` into `dist/` when going live. That is, it __has to be__ above web root. After that change line 5 in `dist/public/index.php` into line 4.

## Todo
- Gulp tasks for production mode to uglify, minify, optimize images
