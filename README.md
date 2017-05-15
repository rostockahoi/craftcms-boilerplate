# CraftCMS boilerplate

## Getting started
- Clone or download this repo and rename it to your needs
- `.gitignore` is set up already but you can change it
- Run `npm install`
- Setup a database
- Follow these instruction to setup Craft Multi-Environment (CME): https://github.com/nystudio107/craft-multi-environment#setting-it-up
- Download latest Craft Package from [CraftCMS latest](http://craftcms.com/latest.zip?accept_license=yes)
- Copy over the missing files and folders from the archive to `dist/craft/app`
- Check the [install section](https://craftcms.com/docs/installing) to set write permissions properly.
- Point your dev server to `dist/public/` (I am using Vagrant and Scotchbox)
- Hit `yourdomain.dev/admin`

If the last point not works try `yourdomain.dev/index.php?admin` and take a look at [Craft's Docs](https://craftcms.com/docs/config-settings#omitScriptNameInUrls). If your are using Apache you may have to configure it to allow overrides through `.htaccess` files.

## Submodules

- nystudio107/craft-scripts (https://github.com/nystudio107/craft-scripts)
	This is useful if you plan to deploy your app using some pattern like this: https://nystudio107.com/blog/database-asset-syncing-between-environments-in-craft-cms.

## Notes

I highly recommend using the multi environment config from here: https://github.com/nystudio107/craft-multi-environment. There is a Nginx configuration example also.

## Important

## Todo

