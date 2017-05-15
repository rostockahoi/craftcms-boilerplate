# CraftCMS 2 boilerplate

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

## Gulp

### Gulp tasks

### Gulp config

```
{
    "url": 				"craft.dev",			// used as proxy fpr BrowserSync
    "src": {									// source file locations
        "styles": 		"src/styles",
        "scripts": 		"src/scripts",
        "templates": 	"src/templates",
        "fonts": 		"src/fonts",
        "images": 		"src/img",
        "favicon": 		"src/favicon/favicon.png"
    },
    "dist": {									// build files locations
    	"styles": 		"public/assets/css",
    	"scripts": 		"public/assets/js",
    	"templates": 	"craft/templates",
    	"fonts": 		"public/assets/fonts",
    	"images": 		"public/assets/img",
    	"favicon": 		"public/favicon"
    },
    "styles": {									// SASS configs
    	"compatibility": [
	        "last 2 versions",
	        "ie >= 9"
	    ],
	    "includePaths": []
    },
    "favicon": {								// favicon generator configs
    	"templateFile": "_favicon.html",			// this file is to be included in your <head> `string`
    	"background": "#FFFFFF",					// Background colour for flattened icons. `string`
    	"theme_color": "#FFFFFF",					// Theme color for browser chrome. `string`
    	"path": "favicon/",							// relative to web server root `string`
    	"display": "standalone",					// Android display: "browser" or "standalone". `string`
    	"orientation": "portrait",					// Android orientation: "portrait" or "landscape". `string`
    	"start_url": "/?homescreen=1",				// Android start application's URL. `string`
    	"pipeHTML": true,
    	"replace": true
    }
}
```

## Notes

I highly recommend using the multi environment config from here: https://github.com/nystudio107/craft-multi-environment. There is a Nginx configuration example also.

## Important

## Todo

